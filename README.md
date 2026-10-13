# AI/ML in the Browser: TensorFlow.js Demos

Four real-time computer vision demos that run entirely in the browser on a webcam feed, using pre-trained TensorFlow.js models with React.

| Folder | What it does | Model |
|---|---|---|
| `bodypix/` | Person segmentation (separates the person from the background) | BodyPix |
| `face-mesh/` | Tracks 468 facial landmarks | Face Mesh |
| `gesture-rec/` | Hand pose and gesture recognition | Handpose + Fingerpose |
| `object-detction/` | Detects and labels everyday objects | COCO-SSD |

The models are pre-trained and were not trained by me. The project covers loading them, running inference on live video, and drawing the results on a canvas.

## Tech stack
JavaScript · React · TensorFlow.js · react-webcam

## Run a demo
```
cd face-mesh        # or bodypix, gesture-rec, object-detction
npm install
npm start
```
Allow camera access when the browser asks.

## Docs
`AIML Project Report.pdf` is the full project report.
