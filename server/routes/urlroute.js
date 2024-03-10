import { Router } from "express";
import {
  convertToShortUrl,
  redirectUser,
  totalVisits,
} from "../controllers/urlControllers.js";

const router = Router();

router.route("/:shortId").get(redirectUser);
router.route("/analytics/:shortId").get(totalVisits);
router.route("/").post(convertToShortUrl);

export default router;
