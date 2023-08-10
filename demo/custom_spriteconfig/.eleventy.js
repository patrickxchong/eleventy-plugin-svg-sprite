const svgSprite = require("eleventy-plugin-svg-sprite");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(svgSprite, {
    path: "./assets/svg",
    globalClasses: "svgicon",
    defaultClasses: "default-class",
    spriteConfig: {
      shape: {
        transform: [{
          svgo: {
            plugins: [{
              name: 'preset-default',
              params: {
                overrides: {
                  collapseGroups: false
                }
              }
            }]
          }
        }]
      }
    }
  });
};
