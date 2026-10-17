import "@tensorflow/tfjs";
import * as handPose from "@tensorflow-models/hand-pose-detection";
import * as fp from "fingerpose";

const FINGERS = [
  [0, 1, 2, 3, 4],
  [0, 5, 6, 7, 8],
  [0, 9, 10, 11, 12],
  [0, 13, 14, 15, 16],
  [0, 17, 18, 19, 20],
];
const COLORS = ["#facc15", "#a855f7", "#3b82f6", "#ef4444", "#f97316"];
const NAMES = { thumbs_up: "Thumbs up", victory: "Victory" };

export async function create() {
  const detector = await handPose.createDetector(handPose.SupportedModels.MediaPipeHands, {
    runtime: "tfjs",
    modelType: "lite",
    maxHands: 2,
  });
  const gestures = new fp.GestureEstimator([fp.Gestures.ThumbsUpGesture, fp.Gestures.VictoryGesture]);

  return {
    async run(video, ctx) {
      const hands = await detector.estimateHands(video);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      let label = "";
      for (const hand of hands) {
        const k = hand.keypoints;
        FINGERS.forEach((f, fi) => {
          ctx.strokeStyle = COLORS[fi];
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(k[f[0]].x, k[f[0]].y);
          for (const j of f.slice(1)) ctx.lineTo(k[j].x, k[j].y);
          ctx.stroke();
        });
        ctx.fillStyle = "#fde68a";
        for (const p of k) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }

        // fingerpose expects [x, y, z] landmarks
        const lm = k.map((p, i) => [p.x, p.y, (hand.keypoints3D?.[i]?.z ?? 0) * 1000]);
        const est = gestures.estimate(lm, 8.5);
        if (est.gestures.length) {
          const best = est.gestures.reduce((a, b) => ((b.score ?? b.confidence) > (a.score ?? a.confidence) ? b : a));
          label = NAMES[best.name] || best.name;
        }
      }
      return label;
    },
    dispose: () => detector.dispose(),
  };
}
