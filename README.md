# eleventy-plugin-svg-sprite

A high performance [Eleventy](https://github.com/11ty/eleventy) universal plugin that compiles a directory of SVG files into a single SVG Sprite and adds shortcodes to embed SVG Sprite and SVG content in Eleventy templates.

The SVG Sprite is compiled once in Eleventy's [beforeBuild](https://www.11ty.dev/docs/events/#beforebuild) hook and is only recompiled when an SVG file is added/modified in the directory. No more slow rebuilding issues where SVG sprites are recompiled for every page! Uses [svg-sprite](https://github.com/svg-sprite/svg-sprite) under the hood.

## Installation

Available on [npm](https://www.npmjs.com/package/eleventy-plugin-svg-sprite).

```bash
npm install eleventy-plugin-svg-sprite --save-dev
# OR
yarn add eleventy-plugin-svg-sprite --dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and add the plugin:

```js
const svgSprite = require("eleventy-plugin-svg-sprite");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(svgSprite, {
    path: "./src/assets/svg", // relative path to SVG directory (MUST be defined when initialising plugin)
  });
};
```

## Config Options

| Option         | Type   | Default                              | Description                                                                                            |
| -------------- | ------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| path           | String | undefined                            |
| defaultClasses | String | (empty string)                       |
| shortcode      | String | svg                                  | Customisable shortcode used to embed SVG content (see [Embedding SVG Content](#embedding-svg-content)) |
| spriteConfig   | Object | (see [options.js](./src/options.js)) | Options you want to pass to [svg-sprite](https://github.com/svg-sprite/svg-sprite)                     |

## Usage

If you want to jump right into the code, you can refer to the [demo]("https://github.com/patrickxchong/eleventy-plugin-svg-sprite/tree/main/demo") folder.

### Including the SVG Sprite

In your base template (Nunjucks, Liquid, Handlebars, or 11ty.js), use the following syntax to include the `svgsprite` [shortcode](https://www.11ty.dev/docs/shortcodes/) for the compiled SVG sprite :

```html
<!-- Nunjucks/Liquid  -->
{% svgsprite %}

<!-- Handlebars  -->
{{{ svgsprite }}}

<!-- 11ty.js -->
${this.svgsprite()}
```

Which will render the following:

```html
<div hidden>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    ...(svg content)...
  </svg>
</div>
```

### Embedding SVG Content

Assuming that the plugin's "shortcode" option is the default `svg` shortcode, use the following syntax to embed an SVG file at the defined path (eg. "./src/assets/svg/demo.svg").

Note: make sure you have [included the SVG Sprite](#including-the-svg-sprite).

```html
<!-- Nunjucks/Liquid  -->
{% svg "demo" %}

<!-- Handlebars  -->
{{{ svg "demo" }}}

<!-- 11ty.js -->
${this.svg("demo")}
```

### Adding a class to your SVG

You can add custom classes to the SVG with the following syntax.

```html
<!-- Nunjucks/Liquid  -->
{% svg "demo", "custom-class" %}

<!-- Handlebars  -->
{{{ svg "demo" "custom-class"}}}

<!-- 11ty.js  -->
`${this.svg("demo", "custom-class")}`
```

## Credits

- https://github.com/11ta/11ta-template for SVG compilation code and SVG shortcode
- https://github.com/11ty/eleventy-plugin-syntaxhighlight and https://github.com/5t3ph/eleventy-plugin-template for Eleventy plugin structure
- [@daviddarnes](https://github.com/daviddarnes) for the suggestion of wrapping this code into a plugin
