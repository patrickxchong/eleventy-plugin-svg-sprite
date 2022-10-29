const path = require("path") 
const util = require("util") 

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
        generator: (_, file) => {
          const path_separator = '--'
          const whitespace_separator = '_'
          const template = 'svg-%s'
          const pathname = file["relative"].split(path.sep).join(path_separator)
          return util.format(template, path.basename(pathname.replace(/\s+/g, whitespace_separator), '.svg'));
        }
      },
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },
  }
};