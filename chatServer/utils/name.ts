import { prefix, objects, suffix } from './constants';

const generateRandomName = () => {
  const pre = prefix[Math.floor(Math.random() * prefix.length)];
  const obj = objects[Math.floor(Math.random() * objects.length)];
  const suf = suffix[Math.floor(Math.random() * suffix.length)];

  return pre + obj + suf;
};

export { generateRandomName };
