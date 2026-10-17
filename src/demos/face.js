import "@tensorflow/tfjs";
import * as fld from "@tensorflow-models/face-landmarks-detection";
import { TRIANGULATION } from "./triangulation.js";

export async function create() {
  const detector = await fld.createDetector(fld.SupportedModels.MediaPipeFaceMesh, {
    runtime: "tfjs",
    refineLandmarks: false,
    maxFaces: 1,
  });
  return {
    async run(video, ctx) {
      const faces = await detector.estimateFaces(video);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = "rgba(167, 243, 208, 0.7)";
      ctx.lineWidth = 0.6;
      for (const face of faces) {
        const k = face.keypoints;
        for (let i = 0; i < TRIANGULATION.length / 3; i++) {
          const a = k[TRIANGULATION[i * 3]];
          const b = k[TRIANGULATION[i * 3 + 1]];
          const c = k[TRIANGULATION[i * 3 + 2]];
          if (!a || !b || !c) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.fillStyle = "#34d399";
        for (const p of k) ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
      }
    },
    dispose: () => detector.dispose(),
  };
}
