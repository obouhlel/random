export default class XorshiftAlgo {
  private seed: number;

  constructor();
  constructor(seed: number);

  constructor(seed?: number) {
    if (!seed) {
      this.seed = Math.round(Math.random() * 1000);
    } else {
      this.seed = seed;
    }
  }

  next(): number {
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >> 17;
    this.seed ^= this.seed << 5;
    return this.seed < 0 ? ~this.seed + 1 : this.seed;
  }
}
