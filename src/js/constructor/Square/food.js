/**
 * 
 * 创建食物的类, 继承自Square
 */


import Square from "./square";
import tools from "../../../utils/tools";

class Food extends Square {
    constructor (x, y, width, height) {
        super(x, y, width ,height);
    }

    
}

const FoodSingle = tools.singleInstance(Food);
export {FoodSingle};