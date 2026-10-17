import "@tensorflow/tfjs";
import * as bodyPix from "@tensorflow-models/body-pix";

export async function create() {
  const net = await bodyPix.load({ architecture: "MobileNetV1", outputStride: 16, multiplier: 0.75 });
  return {
    async run(video, ctx, canvas) {
      const parts = await net.segmentPersonParts(video, { internalResolution: "medium" });
      const mask = bodyPix.toColoredPartMask(parts);
      bodyPix.drawMask(canvas, video, mask, 0.7, 0, false);
    },
    dispose: () => net.dispose(),
  };
}
