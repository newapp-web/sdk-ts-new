import { saveFile } from './file.js';
import { events } from './utils.js';
import { task } from './multithread.js';
// import { saveAs } from 'file-saver';

export const byThunk = async (arr) => {
  await task(arr);
  console.log('🚀 ~ file: index.js:8 ~ byThunk ~ arr', arr);
  events.on('end', (blobs) => {
    console.log('🚀 ~ file: index.js:8 ~ events.on ~ blobs', blobs);
    console.log('🚀 ~ file: index.js:11 ~ events.on ~ end');
    saveFile('frag_bunny.mp4', blobs);
    // saveAs(blobs, "frag_bunny.mp4");
  });
};
