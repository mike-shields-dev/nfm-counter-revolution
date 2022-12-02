export default function getDiscAngle(disc) {
  const discCSSTransformMatrix = getComputedStyle(disc, null).transform;
  if (discCSSTransformMatrix === "none") return 0;

  const transformMatrixValues = discCSSTransformMatrix.slice(7, -1).split(",");
  const [cos, sin] = transformMatrixValues;
  const discAngleDegrees = Math.round(Math.atan2(sin, cos) * (180 / Math.PI)); // -180 ~ 180

  if (discAngleDegrees < 0) {
    return -(360 - (360 + discAngleDegrees));
  }
  return -((360 - discAngleDegrees) % 360);
}
