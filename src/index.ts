import { msm } from "algo/msm";

const min = 1;
const max = 2;
const runs = 10;
const samples = 100;

function getPrecision(values: number[]) {
  const ones = values.filter((v) => v === 1).length;
  const twos = values.filter((v) => v === 2).length;
  return twos === 0 ? 0 : ones / twos;
}

let mathPrecisions: number[] = [];
let msmPrecisions: number[] = [];

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
}

const avgMathPrecision = mathPrecisions.reduce((a, b) => a + b, 0) / runs;
const avgMsmPrecision = msmPrecisions.reduce((a, b) => a + b, 0) / runs;

console.log(
  "Math.random precisions:",
  mathPrecisions.map((p) => p.toFixed(2))
);
console.log(
  "MSM precisions:",
  msmPrecisions.map((p) => p.toFixed(2))
);
console.log("Average Math.random precision:", avgMathPrecision.toFixed(2));
console.log("Average MSM precision:", avgMsmPrecision.toFixed(2));
