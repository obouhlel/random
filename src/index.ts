import { MSM } from "algo/msm";
import { LCG } from "algo/lcg";
import { XorshiftAlgo } from "algo/xorshifting";

const min = -1;
const max = 1;
const runs = 10;
const samples = 100;

function getPrecision(values: number[]) {
  const ones = values.filter((v) => v === 1).length;
  const twos = values.filter((v) => v === 2).length;
  return twos === 0 ? 0 : ones / twos;
}

let mathPrecisions: number[] = [];
let msmPrecisions: number[] = [];
let lcgPrecisions: number[] = [];
let xorshiftPrecisions: number[] = [];

for (let r = 0; r < runs; r++) {
  const seed = Math.round(Math.random() * 1000);
  // Math.random
  const mathrandomValue = [];
  for (let i = 0; i < samples; i++) {
    const value = Math.floor(Math.random() * (max - min + 1) + min);
    mathrandomValue.push(value);
  }
  mathPrecisions.push(getPrecision(mathrandomValue));

  // MSM
  const msmValues = [];
  const msm = new MSM(seed);
  for (let i = 0; i < samples; i++) {
    const value = (msm.next() % (max - min + 1)) + min;
    msmValues.push(value);
  }
  msmPrecisions.push(getPrecision(msmValues));

  // LCG
  const lcg = new LCG(seed);
  const lcgValues = [];
  for (let i = 0; i < samples; i++) {
    const value = (lcg.next() % (max - min + 1)) + min;
    lcgValues.push(value);
  }
  lcgPrecisions.push(getPrecision(lcgValues));

  // Xorshift algorithm
  const xorshift = new XorshiftAlgo(seed);
  const xorshiftValues = [];
  for (let i = 0; i < samples; i++) {
    const value = (xorshift.next() % (max - min + 1)) + min;
    xorshiftValues.push(value);
  }
  xorshiftPrecisions.push(getPrecision(xorshiftValues));
}

const avgMathPrecision = mathPrecisions.reduce((a, b) => a + b, 0) / runs;
const avgMsmPrecision = msmPrecisions.reduce((a, b) => a + b, 0) / runs;
const avgLcgPrecision = lcgPrecisions.reduce((a, b) => a + b, 0) / runs;
const avgXorshiftPrecision =
  xorshiftPrecisions.reduce((a, b) => a + b, 0) / runs;

console.log(
  "Math.random precisions:",
  mathPrecisions.map((p) => p.toFixed(2))
);
console.log(
  "MSM precisions:",
  msmPrecisions.map((p) => p.toFixed(2))
);
console.log(
  "LCG precisions:",
  lcgPrecisions.map((p) => p.toFixed(2))
);
console.log(
  "Xorshift precisions:",
  xorshiftPrecisions.map((p) => p.toFixed(2))
);
console.log("Average Math.random precision:", avgMathPrecision.toFixed(2));
console.log("Average MSM precision:", avgMsmPrecision.toFixed(2));
console.log("Average LCG precision:", avgLcgPrecision.toFixed(2));
console.log("Average Xorshift precision:", avgXorshiftPrecision.toFixed(2));
