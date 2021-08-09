module.exports = {
  path: "",
  defaultClasses: "",
  shortcode: "svg",
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
        generator: 'symbol-%s',
      },
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },
  }
};