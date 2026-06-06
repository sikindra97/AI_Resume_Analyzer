const express =
require("express");

const auth =
require("../middleware/auth");

const {
  analyze,
  aiAnalysis,
  coverLetter
} =
require(
  "../controllers/analysisController"
);

const router =
express.Router();

router.post(
  "/analyze",
  auth,
  analyze
);

router.post(
  "/ai-analysis",
  auth,
  aiAnalysis
);

router.post(
  "/cover-letter",
  auth,
  coverLetter
);

module.exports =
router;