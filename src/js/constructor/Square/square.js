import tools from "../../../utils/tools"
import parameter from "../../asset";

class Sqaure {
    constructor (x = 1, y = 1, width = 20, height = 20, dom) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.viewContent = dom || document.createElement("div");
    }
    //每个square实例都要重写该方法
    touch () {
        console.log("touch");
    }

    update (x, y) {
        this.x = x;
        this.y = y;
        this.viewContent.style.left = x * parameter._squareWidth;
        this.viewContent.style.top = y * parameter._squareWidth;
    }
}

export default Sqaure;