import tools from "../utils/tools"


const parameter = {
    _squareWidth: 20,
    _xlen: 30,
    _ylen: 30,
    _xOffset: 100,
    _yOffset: 100
}

/**
 * Proxy 数据监控,
 * 返回一个新的对象(Porxy不是深度克隆,会影响原对象)
 * 在新的对象中读取或设置对象属性时会自动触发get或set方法
 * 从而进行操作
 * 
 */
// const parameter_porxy = new Proxy(parameter, {
//     get: (target, prop) => {
//         return Reflect.get(target, prop);
//     },
//     set (target, prop, value) {
//         if(prop.startsWith("_")) {
//             throw new Error("私有属性, 不可变动");
//         }
//         Reflect.set(target, prop, value);
//         return target[prop];
//     },
//     ownKeys (target) {
//         return Reflect.ownKeys(target).filter( key => !key.startsWith("_"))
//     }
// });
const parameter_porxy = tools.proxy_private(parameter, true); 

export default parameter_porxy;