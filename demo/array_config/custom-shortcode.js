eleventyConfig.addShortcode("icon", function (name) {
  return `<svg><use xlink:href="#svg-${name}"></use></svg>`;
});