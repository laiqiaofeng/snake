/**
 * es6实现的链表
 * 
 */


  class LinkList {
     constructor () {
         this.head = null;
         this.tail = null;
         this.length = 0;
     }
     //创建一个节点
     createNode (value = 0) {
         const node = {};
         node.value = value;
         node.prev = null;
         node.next = null;
         return node;
     }
     //在任意位置插入一个新元素
     inset (position = 0, value) {
         //添加节点的位置范围在 0 ~ this.length
         if(position >= 0 && position <= this.length) {
            let node = this.createNode(value),
                current = this.head,
                previous = null,
                index = 0;
            // 如果位置为 0
            if(position === 0) {
                // 如果没有头节点, 链表中没有元素
                if(!this.head) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    this.head = node;
                } 
            // 如果位置在最后一个之后
            } else if(position === this.length) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                //循环找出position位置的节点并附给current, 前一个节点赋值给previous
                while (index ++ < position) {
                    previous = current;
                    current = current.next;
                }
                current.prev = node;
                node.next = current;
                node.prev = previous;
                previous.next = node;
            }
            this.length ++;
            return true;
         } else {
             return false;
         }
     }

    //  删除任意位置的元素节点

    removeAt (position) {
        if(position >= 0 && position < this.length) {
            let current = this.head,
                index = 0,
                previous = null;
            if(position === 0) {
                this.head = current.next;
                if(this.length === 1) {
                    this.tail = null;
                }else {
                    this.head.prev = null;
                }
            } else if(position === this.length - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                while (index ++ < position) {
                    previous = current;
                    current = current.next;
                }

                previous.next = current.next;
                current.next.prev = previous;
            }
            this.length --;
            return current.value;
        }else {
            return null;
        }
    }

    //在尾部添加一个节点
    add (value) {
        this.inset(this.length, value);
    }

    //在尾部删除一个节点
    delete () {
        this.removeAt(this.length - 1);
    }
    // 删除第一个
    shift () {
        this.removeAt(0);
    }
    // 添加在第一个
    unshift(value) {
        this.inset(0, value);
    }
 }



 export default LinkList;