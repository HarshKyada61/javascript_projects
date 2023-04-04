// function makeColor(r,g,b){
//     const color = {};
//     color.r = r;
//     color.g = g;
//     color.b = b;
//     color.rgb = function(){
//         const {r,g,b} = this;
//         return `rgb(${r} ${g} ${b})`;
//     };
//     color.hex = function(){
//         const {r,g,b} = this;
//         return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
//     }
//     return color;
// }

// const firstColor = makeColor(35,255,150);

// function Color(r,g,b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
// }

// Color.prototype.rgb = function(){
//     const {r,g,b} = this;
//     return `rgb(${r}, ${g}, ${b})`;
// };
// Color.prototype.hex = function(){
//          const {r,g,b} = this;
//          return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// };
// Color.prototype.rgba = function(a=1.0){
//         const {r,g,b,} = this;
//         return `${r}, ${g}, ${b}, ${a}`;
// }


// const color1 = new Color(255,0,255);
// const color2 = new Color(0,255,255);

class Color{
    constructor(r,g,b, name){
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calHSL();
    }
    innerRGB(){
        const {r,g,b} = this;
        return `${r}, ${g}, ${b}`;
    }
    rgb() {
        return `rgb(${this.innerRGB()})`;
    }
    hex(){
        const {r,g,b} = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    rgba(a = 1.0){
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    hsl(){
        const {h,s,l} = this;
        return `hsl(${h}, ${s}, ${l})`;
    }
    calHSL(){
        let {r,g,b} = this;
        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
      
        if (max == min) {
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
      
          h /= 6;
        }
      
        this.h = h;
        this.s = s;
        this.l = l;
    }

}

const red = new Color(255,67,89,'tomato');