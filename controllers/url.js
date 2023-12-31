const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home", { id: shortID });
}

async function handleRedirectionToOriginalURL(req, res) {
    const shortId = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            },
        }
    );
    if (!entry) return res.status(404).json({ error: "URL not found" });

    if (entry.redirectURL.startsWith("https://"))
        return res.redirect(entry.redirectURL);

    return res.redirect("https://" + entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortID;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectionToOriginalURL,
    handleGetAnalytics,
};
