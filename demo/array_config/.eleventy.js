const svgSprite = require("eleventy-plugin-svg-sprite");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(svgSprite, [{
    path: "./assets/svg_general",
    svgSpriteShortcode: "svgspriteGeneral",
    globalClasses: "svgicon",
    defaultClasses: "default-class"
  },
  {
    path: "./assets/svg_home",
    svgSpriteShortcode: "svgspriteHome",
    svgShortcode: "svgHome", // optional to have custom svgShortcode per instance. The default "svg" shortcode would work for all instances.
    globalClasses: "svgicon",
    defaultClasses: "default-class"
  }, {
    path: "./assets/svg_profile",
    svgSpriteShortcode: "svgspriteProfile",
    globalClasses: "svgicon",
    defaultClasses: "default-class"
  }]);
};
