const svgSprite = require("../.eleventy.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(svgSprite, {
    path: "./assets/svg",
    defaultClasses: "svgicon"
  });
};
