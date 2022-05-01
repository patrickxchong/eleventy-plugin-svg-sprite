import type { Config } from "svg-sprite";

export declare interface IOptions {
  /**
   * Relative path to svg directory
   *
   * @default
   * undefined
   */
  path: string;
  /**
   * Global classes for embedded SVGs.
   *
   * **WILL NOT BE OVERRIDDEN BY CUSTOM CLASSES**
   *
   * @default
   * ""
   */
  globalClasses?: string;
  /**
   * Default classes for embedded SVGs
   *
   * **OVERRIDDEN BY CUSTOM CLASSES**
   *
   * @default
   * ""
   */
  defaultClasses?: string;
  /**
   * Customise shortcode used to embed SVG sprite
   *
   * @default
   * "svgsprite"
   *
   * @example
   *
   * // Nunjucks/Liquid
   * {% svgsprite %}
   *
   * // Handlebars
   * {{{ svgsprite }}}
   *
   * // 11ty.js
   * ${this.svgsprite()}
   */
  svgSpriteShortcode?: string;
  /**
   * Customise shortcode used to embed SVG content
   *
   * @default
   * "svgsprite"
   *
   * @example
   *
   * // Nunjucks/Liquid
   * {% svg "demo" %}
   *
   * // Handlebars
   * {{{ svg "demo" }}}
   *
   * // 11ty.js
   * ${this.svg("demo")}
   */
  svgShortcode?: string;
  /**
   * Optional element wrapper styling to be applied to the generated SVG sprite.
   * You can prevent element wrapping by passing a boolean `false` value.
   *
   * @default
   *
   * ```js
   * {
   * spriteWrap: {
   *   height: '0',
   *   width: '0'
   *  }
   * }
   * ```
   *
   * ---
   *
   * **Default**
   *
   * ```html
   * <!-- Sprite will be nested within a div -->
   * <div style="width: 0; height: 0;">
   *  <svg>...</svg>
   * </div>
   * ```
   *
   * **Disabled**
   * ```html
   * <!-- Sprite will not be apply a wrapped -->
   * <svg></svg>
   * ```
   */
  spriteWrap?: false | CSSStyleDeclaration;
  /**
   * Options you want to pass to [svg-sprite](https://github.com/svg-sprite/svg-sprite)
   */
  spriteConfig?: Config;
}
