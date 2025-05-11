// LCG: Linear Congruential Generator
export class LCG {
  private X: number;
  private readonly a: number;
  private readonly c: number;
  private readonly m: number;

  constructor(seed: number, a: number, c: number, m: number) {
    if (m <= 0) throw new Error("Modulus m must be > 0");
    if (a <= 0 || a >= m)
      throw new Error("Multiplier a must satisfy 0 < a < m");
    if (c < 0 || c >= m) throw new Error("Increment c must satisfy 0 ≤ c < m");
    if (seed < 0 || seed >= m) throw new Error("Seed X must satisfy 0 ≤ X < m");
    if (seed === 0 && c === 0)
      throw new Error("Seed and increment cannot both be zero");
    this.X = seed;
    this.a = a;
    this.c = c;
    this.m = m;
  }

  next(): number {
    this.X = (this.a * this.X + this.c) % this.m;
    return this.X;
  }
}
