module.exports = {
  path: "",
  globalClasses: "",
  defaultClasses: "",
  svgSpriteShortcode: "svgsprite",
  svgShortcode: "svg",
  spriteConfig:
  {
    mode: {
      inline: true,
      symbol: {
        sprite: 'sprite.svg',
        example: false,
      },
    },
    shape: {
      transform: ['svgo'],
      id: {
        generator: 'svg-%s',
      },
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },
  }
};