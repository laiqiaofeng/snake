/**
 * 创建蛇的类
 * 
 */
import tools from "../../utils/tools";
import {strage} from "./strage";
import LinkList from "../../utils/linkList";
import {SquareFactory} from "../factory/squareFactory";
import parameter from "../asset";
import {oGame} from "./game";
import {foodFactory} from "../factory/foodFactory";
const directionObj = {
    _right: {
        x: 1,
        y: 0
    },
    _left: {
        x: -1,
        y: 0
    },
    _up: {
        x: 0,
        y: -1
    },
    _down: {
        x: 0,
        y: 1
    }
}
const directionObj_proxy = tools.proxy_private(directionObj);


const strateges = {
    MOVE: function (oStrage, oSnake, square, source) {
        let snake = oSnake.snake;
        let snake_head = snake.head.value;
        let snake_tail = snake.tail.value;
        
        let newBody = SquareFactory.create(
            "SnakeBody", 
            snake_head.x,
            snake_head.y,
            parameter._squareWidth,
            parameter._squareWidth,
            "#543"
        );
        
        oStrage.remove(newBody.x, newBody.y);
        oStrage.append(newBody);

        let newHead = SquareFactory.create(
            "SnakeHead", 
            square.x,
            square.y,
            parameter._squareWidth,
            parameter._squareWidth,
            "#ff0"
        );
        oStrage.remove(square.x, square.y);
        oStrage.append(newHead);

        
        snake.shift();
        snake.unshift(newBody)
        snake.unshift(newHead);
        

        if(source !== "EAT") {
            oStrage.remove(snake_tail.x, snake_tail.y);
            let newFloor = SquareFactory.create(
                "Floor",
                snake_tail.x,
                snake_tail.y,
                parameter._squareWidth,
                parameter._squareWidth,
                "red"
            )
            oStrage.append(newFloor);
            snake.delete();
        }

    },
    EAT: function (oStrage, snake, square) {
        this.MOVE(oStrage, snake, square, "EAT");
        Math.random() > 0.3 ? foodFactory.createFood(oStrage, "Food") : foodFactory.createFood(oStrage, "Poison");
        snake.score ++;
    },

    DIE: function (oStrage, snake, square) {
        alert("失败," + snake.score + "分");
        oGame.stop();
    }
}




class Snake {
    constructor () {
        this.directionObj = directionObj_proxy;
        this.direction = this.directionObj._right;
        this.snakeLength =  3;
        this.snake = new LinkList();
        this.strateges = strateges;
        this.score = 0;
    }
    
    createSnake (oStrage) {
        let snakeLen = this.snakeLength;
        let snakeHead = SquareFactory.create(
            "SnakeHead", 
            snakeLen, 
            1, 
            parameter._squareWidth, 
            parameter._squareWidth,
            "#ff0")
        this.snake.add(snakeHead);
        oStrage.remove(snakeHead.x, snakeHead.y);
        oStrage.append(snakeHead)

        for(let i = 1; i < this.snakeLength; i ++) {
            let snakeBody = SquareFactory.create(
                "SnakeBody",
                snakeLen - i,
                1,
                parameter._squareWidth, 
                parameter._squareWidth,
                "#543"
            )
            this.snake.add(snakeBody);
            oStrage.remove( snakeBody.x, snakeBody.y);
            oStrage.append(snakeBody)
        }
    }
    
    
    move (oStrage) {
        // console.log(this.snake.head.value.x)

        const square = oStrage.squareTable[this.snake.head.value.y + this.direction.y][this.snake.head.value.x + this.direction.x];
        let msg = square.touch();
        this.strateges[msg](oStrage, this, square);

    }
}

const SnakeSingle = tools.singleInstance(Snake);
const snake = new SnakeSingle();
export {snake};

