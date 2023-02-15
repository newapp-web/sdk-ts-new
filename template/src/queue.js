// 带游标的队列
export class QueueWithCursor {
  constructor(items) {
    this.items = items;
    this.cursor = 0;
  }
  push(elements) {
    if (Object.prototype.toString(elements) === '[object Array]') {
      this.items.splice(this.size, 0, elements);
    } else {
      this.items.push(elements);
    }
  }
  shift() {
    // 从头部移除并返回值
    this.cursor === 0 ? '' : (this.cursor -= 1);
    return this.items.shift();
  }
  // 从头取数据，每次取一个。
  shiftValue() {
    if (this.shiftEmpty()) return;
    const value = this.items[this.cursor];
    this.cursor += 1;
    return value;
  }
  shiftEmpty() {
    return this.cursor == this.size();
  }
  pop() {
    // 从尾部移除并返回值
    this.cursor === this.size() - 1 ? (this.cursor -= 1) : '';
    return this.items.pop();
  }
  isEmpty() {
    return this.size() === 0;
  }
  getIndex() {
    return this.cursor;
  }
  clear() {
    this.items = [];
  }
  size() {
    return this.items.length;
  }
}
