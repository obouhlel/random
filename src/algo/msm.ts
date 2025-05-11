// MSM : Middle square method
export default class MSM {
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
    const squared = (this.seed * this.seed).toString().padStart(6, "0");
    let result = parseInt(squared.slice(1, 4));
    if (this.seed === result) {
      result += 1;
    }
    this.seed = result;
    return result;
  }
}
