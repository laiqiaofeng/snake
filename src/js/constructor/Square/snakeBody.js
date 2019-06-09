/**
 * 
 * 创建蛇身体的类, 继承自Square
 */


import Square from "./square";
class SnakeBody extends Square {
    constructor (x, y, width, height) {
        super(x, y, width, height);
    }
}
export {SnakeBody};