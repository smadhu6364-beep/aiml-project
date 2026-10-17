// Each demo imports its model lazily so the first page load stays small.
export const DEMOS = [
  {
    id: "objects",
    title: "Object detection",
    blurb: "COCO-SSD, 80 everyday objects",
    hint: "Hold up a phone, cup, bottle or book.",
    create: () => import("./objects.js").then((m) => m.create()),
  },
  {
    id: "face",
    title: "Face mesh",
    blurb: "468 facial landmarks",
    hint: "Look at the camera. The mesh follows your face.",
    create: () => import("./face.js").then((m) => m.create()),
  },
  {
    id: "hands",
    title: "Hand gestures",
    blurb: "21 hand keypoints + gestures",
    hint: "Show a thumbs up or a victory sign.",
    create: () => import("./hands.js").then((m) => m.create()),
  },
  {
    id: "body",
    title: "Body segmentation",
    blurb: "BodyPix body-part masks",
    hint: "Step back so more of your body is in frame.",
    create: () => import("./body.js").then((m) => m.create()),
  },
];
