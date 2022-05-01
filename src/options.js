/**
 * @type {import("..").IOptions}
 */
const options = {
  path: "",
  globalClasses: "",
  defaultClasses: "",
  svgSpriteShortcode: "svgsprite",
  svgShortcode: "svg",
  spriteWrap: null, // defaults to { height: '0', width: '0' }
  spriteConfig: {
    mode: {
      inline: true,
      symbol: {
        sprite: "sprite.svg",
        example: false,
      },
    },
    shape: {
      transform: ["svgo"],
      id: {
        generator: "svg-%s",
      },
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },
  },
};

module.exports = options;
