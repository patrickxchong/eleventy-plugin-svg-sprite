const fs = require('fs');
const path = require('path');
const util = require('util');
const glob = require('glob');
const Vinyl = require('vinyl');
const SVGSpriter = require('svg-sprite');

let spriteContent = null; // placeholder variable to populate with spriteContent
let cacheKey = "";

class SVGSprite {
  constructor(config) {
    this.cwd = path.resolve(config.path);
    this.spriteConfig = config.spriteConfig;
  }
  async compile() {
    // Get all SVG files in working directory
    const getFiles = util.promisify(glob);
    const files = await getFiles('**/*.svg', { cwd: this.cwd });
    const newCacheKey = files.map(file => `${file}:${fs.statSync(path.join(this.cwd, file)).mtimeMs}`).join("|");

    if (spriteContent && newCacheKey === cacheKey) {
      return spriteContent;
    } else {
      cacheKey = newCacheKey;
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

    // cache spriteContent as global variable as getSvgSprite below is called in 
    // the function scope of the page instead of the SVGSprite class)
    spriteContent = `<div style="width: 0; height: 0;">${sprite.contents.toString('utf8')}</div>`;
    // fs.utimes('.', new Date(), new Date(), () => { });
  };

  getSvgSprite() {
    return spriteContent;
  }
}

module.exports = SVGSprite;