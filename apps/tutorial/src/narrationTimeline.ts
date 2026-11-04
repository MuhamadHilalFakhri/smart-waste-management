export const WEB_SCENE_STARTS = [
  14.70, 19.54, 38.32, 50.08, 62.44, 72.00, 77.82, 96.12, 106.58,
  119.02, 134.10, 146.30, 159.32, 165.90, 170.68, 174.60, 180.72,
];

export const MOBILE_SCENE_STARTS = [
  185.18, 195.64, 199.20, 207.46, 216.86, 219.28, 222.62, 232.24,
  241.26, 248.46, 265.22, 274.42, 285.42, 290.02, 299.62, 304.50,
  312.82, 320.10, 325.78, 333.32, 343.48, 357.16,
];

export const CLOSING_START_SECONDS = 365.72;
export const AUDIO_DURATION_SECONDS = 379.52;

export function secondsToFrames(seconds: number, fps: number): number {
  return Math.round(seconds * fps);
}

export function durationBetweenSeconds(
  startSeconds: number,
  endSeconds: number,
  fps: number,
): number {
  return secondsToFrames(endSeconds, fps) - secondsToFrames(startSeconds, fps);
}

export function sceneDurationInFrames(
  starts: number[],
  index: number,
  endSeconds: number,
  fps: number,
): number {
  const sceneEnd = starts[index + 1] ?? endSeconds;
  return durationBetweenSeconds(starts[index], sceneEnd, fps);
}
