import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadMiddleware = upload.fields([
  { name: "img", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);
