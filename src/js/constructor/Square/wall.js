/**
 * 
 * 创建围墙的类, 继承自Square
 */


import Square from "./square";
class Wall extends Square {
    constructor (x, y, width, height) {
        super(x, y, width ,height);
    }
}
export {Wall};