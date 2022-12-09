// This function only works under the premise that no other CSS transformations
// other than rotation (in degrees) have been applied to the supplied HTML element.

export default function getRotationDeg(htmlElement) {
  const transformMatrix = getComputedStyle(htmlElement, null).transform;
  if (transformMatrix === "none") return 0;

  const transformMatrixValues = transformMatrix.slice(7, -1).split(",");
  const [cos, sin] = transformMatrixValues;
  const elementAngleDegrees = Math.round(
    Math.atan2(sin, cos) * (180 / Math.PI)
  );

  return elementAngleDegrees < 0
    ? -(360 - (360 + elementAngleDegrees))
    : -((360 - elementAngleDegrees) % 360);
}
