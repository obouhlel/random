import { msm } from "algo/msm";
import { LCG } from "algo/lcg";

const min = 1;
const max = 2;
const runs = 10;
const samples = 100;

// Paramètres pour LCG
const lcgSeed = Math.round(Math.random() * 1000);
const lcgA = 1664525;
const lcgC = 1013904223;
const lcgM = 2 ** 32;

function getPrecision(values: number[]) {
  const ones = values.filter((v) => v === 1).length;
  const twos = values.filter((v) => v === 2).length;
  return twos === 0 ? 0 : ones / twos;
}

let mathPrecisions: number[] = [];
let msmPrecisions: number[] = [];
let lcgPrecisions: number[] = [];

for (let r = 0; r < runs; r++) {
  // Math.random
  const mathrandomValue = [];
  for (let i = 0; i < samples; i++) {
    const value = Math.floor(Math.random() * (max - min + 1) + min);
    mathrandomValue.push(value);
  }
  mathPrecisions.push(getPrecision(mathrandomValue));

  // MSM
  const msmValues = [];
  for (let i = 0; i < samples; i++) {
    const value = (msm() % (max - min + 1)) + min;
    msmValues.push(value);
  }
  msmPrecisions.push(getPrecision(msmValues));

  // LCG
  const lcg = new LCG(lcgSeed + r, lcgA, lcgC, lcgM);
  const lcgValues = [];
  for (let i = 0; i < samples; i++) {
    const value = (lcg.next() % (max - min + 1)) + min;
    lcgValues.push(value);
  }
  lcgPrecisions.push(getPrecision(lcgValues));
}

const avgMathPrecision = mathPrecisions.reduce((a, b) => a + b, 0) / runs;
const avgMsmPrecision = msmPrecisions.reduce((a, b) => a + b, 0) / runs;
const avgLcgPrecision = lcgPrecisions.reduce((a, b) => a + b, 0) / runs;

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
console.log("Average Math.random precision:", avgMathPrecision.toFixed(2));
console.log("Average MSM precision:", avgMsmPrecision.toFixed(2));
console.log("Average LCG precision:", avgLcgPrecision.toFixed(2));
