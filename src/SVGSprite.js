const { glob } = require('glob');
const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');
const util = require('util');
const Vinyl = require('vinyl');

const libUtils = require('./lib-utils');

let spriteCache = {};

class SVGSprite {
  constructor(config) {
    this.config = config;
    this.cwd = path.resolve(config.path);
    if (config.outputFilepath) {
      this.outputFilepath = path.resolve(config.outputFilepath);
    }
    this.spriteConfig = config.spriteConfig;
    this.svgSpriteShortcode = config.svgSpriteShortcode;
  }

  async compile() {
    // Get all SVG files in working directory
    const files = await glob(`**/*.svg`, { cwd: this.cwd });
    const newCacheKey = files.map(file => `${file}:${fs.statSync(path.join(this.cwd, file)).mtimeMs}`).join("|");
    // Note: Replace custom file watching with chokidar if there are bugs/limitations.
    // https://github.com/paulmillr/chokidar
    // https://stackoverflow.com/a/13705878

    if (spriteCache.hasOwnProperty(this.svgSpriteShortcode)) {
      if (spriteCache[this.svgSpriteShortcode].cacheKey === newCacheKey) {
        // if the cacheKey is the same, don't need to rebuild sprite
        return spriteCache[this.svgSpriteShortcode].spriteContent;
      } else {
        spriteCache[this.svgSpriteShortcode].cacheKey = newCacheKey;
      }
    } else {
      spriteCache[this.svgSpriteShortcode] = {
        cacheKey: newCacheKey
      };
    }

    // Make a new SVGSpriter instance w/ configuration
    const spriter = new SVGSpriter(this.spriteConfig);

    // Add them all to the spriter
    files.forEach((file) => {
      spriter.add(
        new Vinyl({
          path: path.join(this.cwd, file),
          base: this.cwd,
          contents: fs.readFileSync(path.join(this.cwd, file)),
        })
      );
    });

    // Wrap spriter compile function in a Promise
    const compileSprite = async (args) => {
      return new Promise((resolve, reject) => {
        spriter.compile(args, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result.symbol.sprite);
        });
      });
    };

    // Compile the sprite file and return it as a string
    const sprite = await compileSprite(this.spriteConfig.mode);

    if (this.outputFilepath) {
      console.info(`[eleventy-plugin-svg-sprite] Writing ${this.config.outputFilepath} from ${this.config.path}`);
      await libUtils.writeFile(this.outputFilepath, sprite.contents.toString('utf8'));
    }

    // cache spriteContent into global spriteCache variable
    spriteCache[this.svgSpriteShortcode].spriteContent = `<div style="width: 0; height: 0; position: absolute; overflow: hidden;">${sprite.contents.toString('utf8')}</div>`;
    // fs.utimes('.', new Date(), new Date(), () => { });
  };

  getSvgSprite() {
    return spriteCache[this.svgSpriteShortcode].spriteContent;
  }
}

module.exports = SVGSprite;