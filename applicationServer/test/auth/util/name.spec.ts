import { generateRandomName } from '@authUtil/name';
import { prefix, objects, suffix } from '@authUtil/constants';

describe('generateRandomName', () => {
  it('prefix, objects, suffix를 조합한 이름을 생성해야 한다', () => {
    const randomName = generateRandomName();

    const prefixExists = prefix.some((pre) => randomName.startsWith(pre));
    const suffixExists = suffix.some((suf) => randomName.endsWith(`${suf}`));
    const objectExists = objects.some((obj) => randomName.includes(obj));

    expect(prefixExists).toBe(true);
    expect(objectExists).toBe(true);
    expect(suffixExists).toBe(true);
  });
});
