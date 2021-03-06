const svgSprite = require("../.eleventy.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(svgSprite, {
    path: "./assets/svg",
    globalClasses: "svgicon",
    defaultClasses: "default-class"
  });
};
