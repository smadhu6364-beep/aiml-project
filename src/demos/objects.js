import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export async function create() {
  const model = await cocoSsd.load();
  return {
    async run(video, ctx) {
      const found = await model.detect(video);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.lineWidth = 3;
      ctx.font = "600 18px system-ui, sans-serif";
      for (const p of found) {
        const [x, y, w, h] = p.bbox;
        ctx.strokeStyle = "#22d3ee";
        ctx.strokeRect(x, y, w, h);
        const text = `${p.class} ${Math.round(p.score * 100)}%`;
        ctx.fillStyle = "#22d3ee";
        ctx.fillRect(x, y - 24, ctx.measureText(text).width + 10, 24);
        ctx.fillStyle = "#0b1020";
        ctx.fillText(text, x + 5, y - 6);
      }
    },
    dispose: () => model.dispose(),
  };
}
