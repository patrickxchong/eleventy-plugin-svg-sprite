module.exports = function () {
  return `<div>
  ${this.svgspriteHome()}
  ${this.svg("placeholder-feature")}
  ${this.svg("placeholder-slider")} <!-- svg does not load because svgspriteGeneral directory does not have 'placeholder-slider' -->
  ${this.svg("placeholder-thumb","custom-class-1 custom-class-2")} <!-- svg does not load because svgspriteGeneral directory does not have 'placeholder-thumb' -->
  </div>`;
};