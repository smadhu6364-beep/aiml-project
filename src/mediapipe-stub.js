// The demos use the tfjs runtime, so the MediaPipe solution packages are never called.
// They are not ES modules, which breaks bundling; this stub stands in for them.
class Unsupported {
  constructor() {
    throw new Error("MediaPipe runtime is not bundled; use runtime: 'tfjs'.");
  }
}
export const Hands = Unsupported;
export const FaceMesh = Unsupported;
export const SelfieSegmentation = Unsupported;
export const Pose = Unsupported;
