/**
 * 
 * 创建地板的类, 继承自Square
 */


 import Square from "./square";

 
 class Floor extends Square {
     constructor (x, y, width, height) {
         super(x, y, width, height);
     }
 }
 export {Floor};