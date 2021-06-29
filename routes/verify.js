import { Router } from "express";
const router = Router();

import verify from "./verifyToken.js";

router.get("/", verify, (req, res) => {
  res.send(req.user);
});

export default router;
