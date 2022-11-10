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

If you would like to compile more than 1 svgsprite, pass an array of config objects with unique `svgSpriteShortcode` **(important)**:

```js
const svgSprite = require("eleventy-plugin-svg-sprite");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(svgSprite, [
    {
      path: "./src/assets/svg_1", // relative path to SVG directory
      svgSpriteShortcode: "svgsprite1",
    },
    {
      path: "./src/assets/svg_2", // relative path to SVG directory
      svgSpriteShortcode: "svgsprite2",
    },
  ]);
};
```

Refer to [demo/array_config/.eleventy.js](./demo/array_config/.eleventy.js) for a sample.

## Config Options

| Option             | Type              | Default                              | Description                                                                                                                           |
| ------------------ | ----------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| path               | String (required) | undefined                            | relative path to svg directory                                                                                                        |
| spriteConfig       | Object            | (see [options.js](./src/options.js)) | Options you want to pass to [svg-sprite](https://github.com/svg-sprite/svg-sprite)                                                    |
| globalClasses      | String            | (empty string)                       | global classes for embedded SVGs (will not be overridden by [custom classes](#adding-custom-classes-to-your-svg))                     |
| defaultClasses     | String            | (empty string)                       | default classes for embedded SVGs (overridden by [custom classes](#adding-custom-classes-to-your-svg))                                |
| svgSpriteShortcode | String            | svgsprite                            | Customise shortcode used to embed SVG sprite (see [Including the SVG Sprite](#including-the-svg-sprite))                              |
| svgShortcode       | String            | svg                                  | Customise shortcode used to embed SVG content (see [Embedding SVG Content](#embedding-svg-content))                                   |
| outputFilepath     | String            | (empty string)                       | Filepath to write compiled spritesheet to (see [Exporting compiled spritesheet as a file](#exporting-compiled-spritesheet-as-a-file)). No file is created if `outputFilepath` is empty. |

## Usage

If you want to jump right into the code, you can refer to the [demo](./demo) folder.

### Including the SVG Sprite

Assuming that the plugin's `svgSpriteShortcode` is `svgsprite` (default), use the following syntax to include the compiled SVG sprite:

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

Assuming that the plugin's `svgShortcode` is `svg` (default), use the following syntax to embed an SVG file at the defined path (eg. `"./src/assets/svg/demo.svg"` when `path` is `"./src/assets/svg"`).

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

### SVG id naming convention

```
📂assets
 ┣ 📂svg
   ┣ 📜 item.svg
   ┣ 📂 sub_dir_1
   ┃ ┗ 📜 item-1.svg
   ┗ 📂 sub_dir_2
     ┗ 📂 sub_sub_dir_2
       ┗ 📜 example item 2.svg
```

For a directory structure as above, the respective SVG ids generated are as follows:

```js
svg "item" // no subdirectory prefix
svg "sub_dir_1--item-1" // one level subdirectory with '--' prefix
svg "sub_dir_2--sub_sub_dir_2--example_item_2" // two level subdirectory with '--' prefix, also convert spaces into '_'
```

### Using your own shortcode to render SVGs

You can write your own SVG shortcode if you prefer. To make sure the SVG is referenced correctly, you can use the snippet below to start. `#svg-` is the prefix created by svg-sprite and `name` would be the filename of the SVG without the `.svg` extension (also refer to [SVG id naming convention](#svg-id-naming-convention) for edge cases and other uses).

```js
eleventyConfig.addShortcode("icon", function (name) {
  return `<svg><use xlink:href="#svg-${name}"></use></svg>`;
});
```

### Exporting compiled spritesheet as a file

If you prefer to host the compiled spritesheet as a file/on a CDN instead of embedding the spritesheet in the template, you can specify `outputFilepath` in the config, which would write to the location of the path (be careful as it will overwrite any file that pre-exists at that path). 

As an example, if `outputPath` is set to `"./_site/sprites/icons.svg"`, you can reference a file named `placeholder-feature.svg`with the following html snippet. (note the `svg-` prefix)
```html
<svg>
  <use xlink:href="/sprites/icons.svg#svg-placeholder-feature"></use>
</svg>
```

Refer to [demo/file_output/.eleventy.js](./demo/array_config/.eleventy.js) for an example.

## Credits

- https://github.com/11ta/11ta-template for SVG compilation code and SVG shortcode
- https://github.com/11ty/eleventy-plugin-syntaxhighlight, https://github.com/brob/eleventy-plugin-svg-contents and https://github.com/5t3ph/eleventy-plugin-template for Eleventy plugin structure
- [@daviddarnes](https://github.com/daviddarnes) for the suggestion of wrapping this code into a plugin

## Support this project

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/patrickxchong)
