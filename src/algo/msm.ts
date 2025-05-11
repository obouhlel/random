// MSM : Middle square method
let SEED: number = Math.round(Math.random() * 1000);

export function msm(): number {
  const squared = (SEED * SEED).toString().padStart(6, "0");
  let result = parseInt(squared.slice(1, 4));
  if (SEED === result) {
    result += 1;
  }
  SEED = result;
  return result;
}
