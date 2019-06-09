/**
 * 
 * 创建蛇头的类, 继承自Square, 单例
 */


import Square from "./square";
import tools from "../../../utils/tools"

class SnakeHead extends Square {
    constructor (x, y, width, height) {
        super(x, y, width, height);
    }
}

const SnakeHeadSingle = tools.singleInstance(SnakeHead);
export {SnakeHeadSingle};