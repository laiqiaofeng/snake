/**
 * 舞台类
 * 
 */
import parameter from "../asset";
import Sqaure from "../constructor/Square/square";
import {SquareFactory} from "../factory/squareFactory";



 class Strage extends Sqaure{
     constructor (x, y, width, height) {
        super(x, y, width, height);
        this.squareTable = [];

        // this.init();
        
     }

     init () {
        const strage = this.viewContent; 
        strage.style.position = "absolute";
        strage.style.backgroundColor = "blue";
        strage.style.width = this.width + 'px';
        strage.style.height = this.height + "px";
        strage.style.left = parameter._xOffset + "px";
        strage.style.top = parameter._yOffset + "px";
        document.body.appendChild(strage);

        
        this.createsquareTable();
     }
     createsquareTable () {
         let xlen = parameter._xlen;
         let ylen = parameter._ylen;
         let squareWidth = parameter._squareWidth;
         for(let i = 0; i < xlen; i ++) {
             let sqaure = null;
             this.squareTable[i] = [];
             for(let j = 0; j < ylen; j ++) {
                if(i == 0 || i == xlen - 1 || j == 0 || j == ylen - 1) {
                    sqaure = SquareFactory.create("Wall", j, i, squareWidth, squareWidth, "black");
                }else {
                    sqaure = SquareFactory.create("Floor", j, i, squareWidth, squareWidth, "red");
                }
                this.squareTable[i][j] = sqaure;
                // debugger;
                this.viewContent.appendChild(sqaure.viewContent);
             }
         }
     }

    //  删除方块方法
     remove (x, y) {
         const square = this.squareTable[y][x];
         this.viewContent.removeChild(square.viewContent);
        //  console.log(square)
         this.squareTable[y][x] = null;
     }
    //  添加方块方法
     append(square) {
        //  console.log(square)
         this.viewContent.appendChild(square.viewContent);
         this.squareTable[square.y][square.x] = square;
     }
 }
 const strage = new Strage(
                        parameter._xOffset, 
                        parameter._yOffset,
                        parameter._xlen * parameter._squareWidth,
                        parameter._ylen * parameter._squareWidth );

 export {strage};