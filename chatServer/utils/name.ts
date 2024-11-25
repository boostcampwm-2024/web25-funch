import { prefix, objects, suffix, colorList } from './constants';

class Name {
  static colors: { [key: string]: string } = {};

  static generateRandomColor() {
    const idx = Math.floor(colorList.length * Math.random());
    return colorList[idx];
  }

  static generateRandomName = () => {
    const pre = prefix[Math.floor(Math.random() * prefix.length)];
    const obj = objects[Math.floor(Math.random() * objects.length)];
    const suf = suffix[Math.floor(Math.random() * suffix.length)];

    return pre + obj + suf;
  };
}

export { Name };
