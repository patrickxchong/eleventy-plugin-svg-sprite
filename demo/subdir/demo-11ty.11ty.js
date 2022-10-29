module.exports = function () {
  return `<div>
  ${this.svgsprite()}
  ${this.svg("sub_dir_1--placeholder-feature")}
  ${this.svg("sub_dir_2--sub_sub_dir_2--placeholder_slider")}
  ${this.svg("placeholder-thumb","custom-class-1 custom-class-2")}
  </div>`;
};