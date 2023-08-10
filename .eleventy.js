const SVGSprite = require("./src/SVGSprite");
const lodash = require('lodash'); 

let idCounter = 0;

module.exports = (eleventyConfig, pluginConfig = [{}]) => {
  if (!Array.isArray(pluginConfig)) {
    pluginConfig = [pluginConfig];
  }

  svgSpriteShortcodeList = [];

  for (options of pluginConfig) {
    if (!options.path) {
      throw new Error("[eleventy-plugin-svg-sprite] path must be specified in plugin options");
    }

    let defaultOptions = require("./src/options");
    let config = lodash.merge(defaultOptions, options);

    // Debug statement to log config after merge
    // const util = require('util')
    // console.log(util.inspect(config, {showHidden: false, depth: null, colors: true}))

    if (svgSpriteShortcodeList.includes(config.svgSpriteShortcode)) {
      throw new Error("[eleventy-plugin-svg-sprite] illegal to have duplicate svgSpriteShortcode in config list");
    }
    svgSpriteShortcodeList.push(config.svgSpriteShortcode);

    let svgSpriteInstance = new SVGSprite(config);
    eleventyConfig.on('beforeBuild', async () => { await svgSpriteInstance.compile(); });

    eleventyConfig.addShortcode(config.svgSpriteShortcode, () => { return svgSpriteInstance.getSvgSprite(config.svgSpriteShortcode); });

    eleventyConfig.addShortcode(config.svgShortcode, (name, classes, desc) => {
      if (!name) {
        throw new Error("[eleventy-plugin-svg-sprite] name of SVG must be specified");
      }
      const nameAttr = name;
      const classesAttr = `${config.globalClasses} ${classes || config.defaultClasses}`;
      // "desc" is required for accessibility and Lighthouse validations
      const descAttr = desc || `${nameAttr} icon`;
      // a unique id is generated so that the svg references the correct description in aria-labelledby
      const uniqueID = (idCounter++).toString(36);

      return `<svg class="${classesAttr}" aria-labelledby="symbol-${nameAttr}-desc-${uniqueID}" role="group">
                  <desc id="symbol-${nameAttr}-desc-${uniqueID}">${descAttr}</desc>
                  <use xlink:href="#svg-${nameAttr}"></use>
              </svg>`;
    });
  }
};
