const tools = {
    //继承原型链
    inhert: (function () {
        let F = function () {};
        return function (Target, Origin) {
            F.prototype = Origin.prototype;
            Target.prototype = new F();
            Target.prototype.constructor = Target;
            Target.prototype.uber = Origin.prototype;
        }
    })(),
    //即继承原型链,又继承静态方法和静态属性, 直接返回一个构造函数
    extends (origin) {
        let result = function () {

        };
        this.inhert(result, origin);
        //利用Object.setPrototypeOf将origin设置为result的原型, 使得可以继承静态方法和静态属性
        // Object.setPrototypeOf(result, origin);
        return result; 
    },
    //返回一个单例构造函数
    singleInstance(origin) {
        let instance;
        const handler = {
            construct: function (target, value) {
                if(typeof instance !== "object") {
                    instance = new origin(...value);
                }
                return instance;
            }
        }
        return new Proxy(origin, handler);
    },
    // 节流
    throttle: (
        func,
        time = 17,
        options = {
            leading: true,
            trailing: false,
            context: null
        }
    ) => {
        let timer = null;
        let previous_time = new Date().getTime();
        const _throtle = function (...arg) {
            let now_time = new Date().getTime();
            if(!options.leading) {
                if(timer) return;
                timer = setTimeout( () => {
                    timer = null;
                    func.apply(options.context, arg);
                }, time )
            } else if(now_time - previous_time > time) {
                func.apply(options.context, arg);
                previous_time = now_time;
            } else if(options.trailing) {
                if(timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout( () => {
                    func.apply(options.context, arg);
                }, time);
            }
        }

        _throtle.cancel = function () {
            clearTimeout(timer);
            timer = null;
            previous_time = 0;
        }
        return _throtle;
    },
    // 防抖
    debounce: (
        func,
        time = 17,
        options = {
            leading: true,
            trailing: true,
            context: null
        }
    ) => {
        let timer = null;
        const _debounce = function (...arg) {
            if(timer) {
                clearTimeout(timer);
            }
            if(options.leading && !timer) {
                timer = setTimeout(null, time);
                func.apply(options.context, arg);
            } else if(options.trailing) {
                timer = setTimeout( () => {
                    timer = null;
                    func.apply(options.context, arg);
                }, time);
            }
        }

        _debounce.cancel = function () {
            clearTimeout(timer);
            timer = null;
        }
        return _debounce;
    },
    // 私有化变量
    proxy_private (obj, isRead = true) {
        const handler = {
            get: function (target, key) {
                if(key.startsWith("_") && !isRead) {
                    throw new Error("该属性是私有属性");
                }
                return Reflect.get(target, key);
                
            },
            set: function (target, key, value) {
                if(key.startsWith("_")){
                    throw new Error("该属性是私有属性");
                }
                Reflect.set(target, key, value);
            },
            ownKeys: function (target) {
                return Reflect.ownKeys(target).filter(key => !key.startsWith("_"));
            }

        }
        return new Proxy(obj, handler);
    }
}

export default tools;