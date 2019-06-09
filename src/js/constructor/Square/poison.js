/**
 * 
 * 创建毒药的类, 继承自Square
 */


import Square from "./square";
import tools from "../../../utils/tools";
 
class Poison extends Square {
    constructor (x, y, width, height) {
        super(x, y, width, height);
    }
}
const PoisonSingle = tools.singleInstance(Poison);

export {PoisonSingle};