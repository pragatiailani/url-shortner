const express = require("express");
const {
    handleGenerateNewShortURL,
    handleRedirectionToOriginalURL,
    handleGetAnalytics
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortID", handleRedirectionToOriginalURL);

router.get("/analytics/:shortID", handleGetAnalytics);

module.exports = router;
