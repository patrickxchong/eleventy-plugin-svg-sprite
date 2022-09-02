module.exports = function () {
  return `<div>
  ${this.svgsprite()}
  ${this.svg("placeholder-feature")}
  ${this.svg("placeholder-slider")}
  ${this.svg("placeholder-thumb","custom-class-1 custom-class-2")}
  </div>`;
};