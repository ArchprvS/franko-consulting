// utils.js
export function machine_writing(text, interval, callback) {
  let i = 0;
  const interval_id = setInterval(() => {
    if (i < text.length) {
      callback(text[i]);
      i++;
    } else {
      clearInterval(interval_id);
    }
  }, interval);
}