import { Broadcast } from '@src/types';

class Live {
  public data: Map<string, Broadcast>;
  private static instance: Live;
  private constructor() {
    this.data = new Map();
  }

  public static getInstance() {
    return this.instance != null ? this.instance : (this.instance = new Live());
  }
}

export { Live };
