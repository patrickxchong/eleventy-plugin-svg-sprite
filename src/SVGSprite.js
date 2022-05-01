const fs = require("fs");
const path = require("path");
const util = require("util");
const glob = require("glob");
const Vinyl = require("vinyl");
const SVGSpriter = require("svg-sprite");

let spriteContent = null; // placeholder variable to populate with spriteContent
let cacheKey = "";

/**
 * Writes inline styles
 *
 * @param {import("..").IOptions['spriteWrap']}
 */
function createWrapper(config = { height: "0", width: "0" }) {

  let style = '<div style="';

  for (const prop in config) style += `${prop}:${config[prop]};`;

  return style + '">';
}

class SVGSprite {
  /**
   * @param {import("..").IOptions} config
   */
  constructor(config) {

    this.cwd = path.resolve(config.path);
    this.spriteConfig = config.spriteConfig;

    if (config.spriteWrap === false) {
      this.spriteWrapper = false;
    } else if (typeof config.spriteWrap === "object") {
      this.spriteWrapper = createWrapper(config.spriteWrap);
    } else if (config.spriteWrap === null) {
      this.spriteWrapper = createWrapper({ height: '0', width: '0' });
    }
  }

  async compile() {
    // Get all SVG files in working directory
    const getFiles = util.promisify(glob);
    const files = await getFiles("**/*.svg", { cwd: this.cwd });
    const newCacheKey = files
    .map((file) => `${file}:${fs.statSync(path.join(this.cwd, file)).mtimeMs}`)
    .join("|");

    // Note: Replace custom file watching with chokidar if there are bugs/limitations.
    // https://github.com/paulmillr/chokidar
    // https://stackoverflow.com/a/13705878
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
    const content = sprite.contents.toString("utf8")

    // cache spriteContent as global variable as getSvgSprite below is called in
    // the function scope of the page instead of the SVGSprite class)
    spriteContent = this.spriteWrapper ? `${this.spriteWrapper}${content}</div>` : content

  }

  getSvgSprite() {

    return spriteContent;
  }
}

module.exports = SVGSprite;
