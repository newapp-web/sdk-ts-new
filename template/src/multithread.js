// 并发消费队列
import { QueueWithCursor } from './queue.js';
import { events } from './utils.js';
import { fetchData } from './file.js';
let multithread = 3;

export const task = (items, thread = 3) => {
  // items是一个URLs Array
  let buffersArray = new Array(items.length).fill(undefined);
  console.log('🚀 ~ file: multithread.js:10 ~ task ~ buffersArray', buffersArray);
  if (items.length === 0) return;
  // 约束线程数最大为5，最小为1
  if (thread > 5) {
    multithread = 5;
  } else if (thread < 1) {
    multithread = 1;
  } else if (thread > items.length) {
    multithread = items.length;
  } else {
    multithread = thread;
  }
  console.log('🚀 ~ file: multithread.js:21 ~ task ~ multithread', multithread);
  const queue = new QueueWithCursor(items);

  events.on('next', async () => {
    if (queue.shiftEmpty()) {
      return;
    }
    // 取一个task，执行。
    const index = queue.getIndex();
    const url = queue.shiftValue();

    fetchData(url, index).then((buffer) => {
      buffersArray[index] = buffer;
      events.emit('thunk', url, index);
    });
    if (index === queue.size() - 1) {
      //最后一个了，通知结束
    } else {
      events.emit('next');
    }
  });
  events.on('thunk', () => {
    if (
      buffersArray.every((ele) => {
        return ele !== undefined;
      })
    ) {
      events.emit('end', buffersArray);
      console.log('🚀 ~ file: multithread.js:36 ~ events.on ~ end');
    }
  });
  for (let i = 0; i < multithread; i++) {
    events.emit('next');
  }
};
