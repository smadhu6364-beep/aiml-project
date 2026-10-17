import { useEffect, useRef, useState } from "react";

// Opens the webcam, loads the selected model once, then runs detect + draw every animation frame.
export default function CameraStage({ demo }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Starting camera...");
  const [label, setLabel] = useState("");

  useEffect(() => {
    let stream;
    let raf;
    let stopped = false;
    let runner;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: false });
        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();
        setStatus("Loading model...");
        runner = await demo.create();
        if (stopped) return runner.dispose?.();
        setStatus("");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const loop = async () => {
          if (stopped) return;
          const w = video.videoWidth;
          const h = video.videoHeight;
          if (w && h) {
            if (canvas.width !== w) {
              canvas.width = w;
              canvas.height = h;
            }
            const out = await runner.run(video, ctx, canvas);
            if (out !== undefined) setLabel(out || "");
          }
          raf = requestAnimationFrame(loop);
        };
        loop();
      } catch (err) {
        console.error(err);
        setStatus(err.name === "NotAllowedError" ? "Camera permission was denied." : `Could not start: ${err.message}`);
      }
    })();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      runner?.dispose?.();
    };
  }, [demo]);

  return (
    <section>
      <div className="stage">
        <video ref={videoRef} playsInline muted />
        <canvas ref={canvasRef} />
        {status && <div className="status">{status}</div>}
        {label && <div className="label">{label}</div>}
      </div>
      <p className="hint">{demo.hint}</p>
    </section>
  );
}
