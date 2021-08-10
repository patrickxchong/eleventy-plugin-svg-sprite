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
    path: "./src/assets/svg", // relative path to SVG directory
    // (MUST be defined when initialising plugin)
  });
};
```

## Config Options

| Option         | Type              | Default                              | Description                                                                                                       |
| -------------- | ----------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| path           | String (required) | undefined                            | relative path to svg directory                                                                                    |
| globalClasses  | String            | (empty string)                       | global classes for embedded SVGs (will not be overridden by [custom classes](#adding-custom-classes-to-your-svg)) |
| defaultClasses | String            | (empty string)                       | default classes for embedded SVGs (overridden by [custom classes](#adding-custom-classes-to-your-svg))            |
| shortcode      | String            | svg                                  | Customisable shortcode used to embed SVG content (see [Embedding SVG Content](#embedding-svg-content))            |
| spriteConfig   | Object            | (see [options.js](./src/options.js)) | Options you want to pass to [svg-sprite](https://github.com/svg-sprite/svg-sprite)                                |

## Usage

If you want to jump right into the code, you can refer to the [demo](./demo) folder.

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
    ...(compiled svg sprite)...
  </svg>
</div>
```

### Embedding SVG Content

Assuming that the plugin's `shortcode` option is the default `svg` shortcode, use the following syntax to embed an SVG file at the defined path (eg. "./src/assets/svg/demo.svg").

Note: make sure you have [included the SVG Sprite](#including-the-svg-sprite).

```html
<!-- Nunjucks/Liquid  -->
{% svg "demo" %}

<!-- Handlebars  -->
{{{ svg "demo" }}}

<!-- 11ty.js -->
${this.svg("demo")}
```

Which will render the following (assuming that `globalClasses: "svgicon", defaultClasses: "default-class"` when the plugin is initialised):

```html
<svg class="svgicon default-class">
  ...(SVG content for demo.svg that references SVG Sprite above)...
</svg>
```

### Adding custom classes to your SVG

Adding custom classes will override classes defined in `defaultClasses`, but classes defined in `globalClasses` will remain.

```html
<!-- Nunjucks/Liquid  -->
{% svg "demo", "custom-class" %}

<!-- Handlebars  -->
{{{ svg "demo" "custom-class"}}}

<!-- 11ty.js  -->
`${this.svg("demo", "custom-class")}`
```

Which will render the following (assuming that `globalClasses: "svgicon", defaultClasses: "default-class"` when the plugin is initialised):

```html
<svg class="svgicon custom-class">
  ...(SVG content for demo.svg that references SVG Sprite above)...
</svg>
```

## Credits

- https://github.com/11ta/11ta-template for SVG compilation code and SVG shortcode
- https://github.com/11ty/eleventy-plugin-syntaxhighlight, https://github.com/brob/eleventy-plugin-svg-contents and https://github.com/5t3ph/eleventy-plugin-template for Eleventy plugin structure
- [@daviddarnes](https://github.com/daviddarnes) for the suggestion of wrapping this code into a plugin

## Support this project

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/patrickxchong)
