import { useState } from "react";
import CameraStage from "./CameraStage.jsx";
import { DEMOS } from "./demos/index.js";

export default function App() {
  const [active, setActive] = useState(null);
  const demo = DEMOS.find((d) => d.id === active);

  return (
    <div className="page">
      <header className="top">
        <h1>Browser Vision Lab</h1>
        <p>Four real-time computer vision demos running on your webcam with TensorFlow.js. Video never leaves your device.</p>
      </header>

      <nav className="tabs">
        {DEMOS.map((d) => (
          <button key={d.id} className={d.id === active ? "tab on" : "tab"} onClick={() => setActive(d.id)}>
            <strong>{d.title}</strong>
            <span>{d.blurb}</span>
          </button>
        ))}
      </nav>

      {demo ? (
        <CameraStage key={demo.id} demo={demo} />
      ) : (
        <div className="empty">Pick a demo above. Your browser will ask for camera access.</div>
      )}

      <footer className="foot">
        Pre-trained models from <a href="https://github.com/tensorflow/tfjs-models">tfjs-models</a>.{" "}
        <a href="https://github.com/smadhu6364-beep/aiml-project">Source on GitHub</a>
      </footer>
    </div>
  );
}
