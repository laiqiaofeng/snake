
import parameter from "../asset";
import tools from "../../utils/tools";
import {foodFactory} from "../factory/foodFactory";
import {strage} from "./strage";
import {snake} from "../entity_class/snake";

class Game {
    constructor (time) {
        this.time = time;
    }

    init(oStrage, oSnake, oFoodFactory) {
        oStrage.init();
        oSnake.createSnake(oStrage);
        this.bindEvent(oSnake);
        oFoodFactory.createFood(oStrage, "Food");
    }

    start (oSnake, oStrage) {
        
        this.timer = setInterval( () => {
            oSnake.move(oStrage);
        } ,this.time)
    }
    stop () {
        clearInterval(this.timer);
    }
    bindEvent (oSnake) {
        function keyEvent (e) {
            switch (e.keyCode) {
                case 37: 
                    oSnake.direction !== oSnake.directionObj._right && (oSnake.direction = oSnake.directionObj._left);
                    break;
                case 38: 
                    oSnake.direction !== oSnake.directionObj._down && (oSnake.direction = oSnake.directionObj._up);
                    break;
                case 39: 
                    oSnake.direction !== oSnake.directionObj._left && (oSnake.direction = oSnake.directionObj._right);
                    break;
                case 40: 
                console.log(oSnake.directionObj._up, oSnake.direction)
                    oSnake.direction !== oSnake.directionObj._up && (oSnake.direction = oSnake.directionObj._down);
                    break;
                default:
                    break;
            }
        }

        document.addEventListener("keydown", tools.throttle(keyEvent));
    }
}

const GameSingle = tools.singleInstance(Game);

const oGame = new GameSingle(300);
oGame.init(strage, snake, foodFactory);
oGame.start(snake, strage);
export {oGame};