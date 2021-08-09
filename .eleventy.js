const path = require('path');
const SVGSprite = require("./src/SVGSprite");

module.exports = (eleventyConfig, options = {}) => {
  if (!options.path) {
    throw new Error("[eleventy-plugin-svg-sprite] path must be specified in plugin options");
  }

  let defaultOptions = require("./src/options");
  let config = Object.assign(defaultOptions, options);

  let svgSpriteInstance = new SVGSprite(config);
  eleventyConfig.on('beforeBuild', async () => { await svgSpriteInstance.compile(config); });
  eleventyConfig.addShortcode('svgsprite', svgSpriteInstance.getSvgSprite);

  eleventyConfig.addShortcode(config.shortcode, (name, classes, desc, location) => {
    // "desc" and "location" attributes are required for accessibility and 
    // Lighthouse validations and are hardcoded in the layouts to provide 
    // unique values as required by Lighthouse.
    if (!name) {
      throw new Error("[eleventy-plugin-svg-sprite] name of SVG must be specified");
    }
    const nameAttr = name;
    const classesAttr = `${classes || config.defaultClasses} fill-current`;
    const descAttr = desc || `${nameAttr} icon`;
    const locationAttr = location || 'content';

    return `<svg class="${classesAttr}" aria-describedby="symbol-${nameAttr}-desc" aria-labelledby="symbol-${nameAttr}-desc" role="group">
                <desc id="symbol-${nameAttr}-desc-${locationAttr}">${descAttr}</desc>
                <use xlink:href="#symbol-${nameAttr}"></use>
            </svg>`;
  });
};
