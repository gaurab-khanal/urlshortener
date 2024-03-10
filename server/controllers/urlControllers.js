import { Url } from "../models/urlmodel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { nanoid } from "nanoid";

const convertToShortUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(404, "Url is required");
  }

  const shortId = nanoid(8);

  const URL = await Url.create({
    shortId,
    redirectURL: url,
    visitHistory: [],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, URL, "URL shortened successfully"));
});

const redirectUser = asyncHandler(async (req, res) => {
  const { shortId } = req.params;

  if (!shortId) {
    throw new ApiError(400, "short url is required");
  }

  const data = await Url.findOne({ shortId });

  if (!data) {
    throw new ApiError(404, "Url not found");
  }

  data.visitHistory.push({ timestamp: Date.now() });

  await data.save();

  res.redirect(data.redirectURL);
});

const totalVisits = asyncHandler(async (req, res) => {
  const { shortId } = req.params;

  const data = await Url.findOne({ shortId });

  if (!data) {
    throw new ApiError(404, "Url not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {
      totalVisits: data.visitHistory.length,
      analytics: data.visitHistory,
    })
  );
});

export { convertToShortUrl, redirectUser, totalVisits };
