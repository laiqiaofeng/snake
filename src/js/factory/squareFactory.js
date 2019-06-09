/**
 * 方块的工厂对象
 * 
 */

import parameter from "../asset";
import {Floor} from "../constructor/Square/floor";
import {Wall} from "../constructor/Square/wall";
import {FoodSingle} from "../constructor/Square/food";
import {SnakeHeadSingle} from "../constructor/Square/snakeHead";
import {SnakeBody} from "../constructor/Square/snakeBody";
import {PoisonSingle} from "../constructor/Square/poison";
import tools from "../../utils/tools";
console.log(PoisonSingle);
const msgObj = {
    _move: "MOVE",
    _eat: "EAT",
    _die: "DIE"
}

const msgObj_proxy = tools.proxy_private(msgObj);
class SquareFactory  {
    constructor () {

    }
    static create (type, ...arg) {
        if(!SquareFactory.prototype[type]) {
            throw new Error("没有该子类工厂");
        }
        // console.log(type);
        // console.log(SquareFactory.prototype[type])
        // if(SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
        //     SquareFactory.prototype[type].prototype = new SquareFactory();
        // }
        
        const newSqauare = SquareFactory.prototype[type](...arg);
        return newSqauare;

    }
    // 初始化方块
    init (target, color, msg) {
        target.viewContent.style.position = "absolute";
        target.viewContent.style.backgroundColor = color;
        target.viewContent.style.width = target.width + "px";
        target.viewContent.style.height = target.height + "px";
        target.viewContent.style.left = target.x * parameter._squareWidth + "px";
        target.viewContent.style.top = target.y * parameter._squareWidth + "px";
        // 重写touch方法
        target.touch = function () {
            return msg;
        }
    }
    //地板子类工厂
    Floor (x, y, width, height, color) {
        const floor = new Floor(x, y, width, height);
        this.init(floor, color, msgObj_proxy._move);
        return floor;
    }

    //围墙子类工厂
    Wall (x, y, width, height, color) {
        const wall = new Wall(x, y, width, height);
        this.init(wall, color, msgObj_proxy._die);
        return wall;
    }

    //食物子类工厂 
    Food (x, y, width, height, color) {
        const food = new FoodSingle(x, y, width, height);
        food.update(x, y);
        this.init(food, color, msgObj_proxy._eat);
        return food;
    }
    // 毒药子类工厂

    Poison (x, y, width, height, color) {
        const poison = new PoisonSingle(x, y, width, height);
        poison.update(x, y);
        this.init(poison, color, msgObj_proxy._eat);
        return poison;
    }
    //蛇头子类工厂
    SnakeHead (x, y, width, height, color) {
        console.log()
        const snakeHead = new SnakeHeadSingle(x, y, width, height);
        snakeHead.update(x, y);
        this.init(snakeHead, color, msgObj_proxy._die);
        return snakeHead;
    }
    // 蛇身子类工厂
    SnakeBody (x, y, width, height, color) {
        const snakeBody = new SnakeBody(x, y, width, height);
        this.init(snakeBody, color, msgObj_proxy._die);
        return snakeBody;
    }

}

export {SquareFactory};