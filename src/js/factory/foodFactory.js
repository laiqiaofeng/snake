/**
 * 
 * 创建各种食物
 */
import parameter from "../asset";
import tools from "../../utils/tools";
import {SquareFactory} from "../factory/squareFactory";
const colorObj = {
    "Food": "#888",
    "Pioson": "#290"
}
 class FoodFactory  {
     constructor () {

     }

     createFood (oStrage, type) {
        let x, y, flag = true;
        while (flag) {
            x = Math.floor( Math.random() * 28) + 1;
            y = Math.floor( Math.random() * 28) + 1;
            if(oStrage.squareTable[y][x].touch() !== "DIE") {
                flag = false;
            }
        }
        let newFood = SquareFactory.create(type, x, y, parameter._squareWidth, parameter._squareWidth, colorObj[type]);
        oStrage.remove(x, y);
        oStrage.append(newFood);

        if(type == "Poison") {
            setTimeout( () => {
                oStrage.remove(x, y);
                oStrage.append(SquareFactory.create("Floor", x, y, parameter._squareWidth, parameter._squareWidth, "red"))
                Math.random() > 0.9 ? this.createFood(oStrage, "Food") : this.createFood(oStrage, "Poison");
            }, 5000);
        }
    }
 }

 const foodFactory = new FoodFactory();

 export {foodFactory};