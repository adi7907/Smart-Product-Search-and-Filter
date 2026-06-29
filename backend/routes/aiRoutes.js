const express = require('express');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = function(upload) {
  const router = express.Router();

  router.post('/visual-search', upload.single('image'), async (req, res) => {
    try {
      let imageData, mimeType;
      if (req.file) {
        imageData = fs.readFileSync(req.file.path).toString("base64");
        mimeType = req.file.mimetype;
        try { fs.unlinkSync(req.file.path); } catch(e){}
      } else if (req.body && req.body.image_url) {
        if (!process.env.GEMINI_API_KEY) {
          const clean = req.body.image_url.split('/').pop().split('.')[0].replace(/[-_]/g, ' ');
          return res.json({ search_term: clean && clean.length > 2 ? clean : "Pickle" });
        }
        const response = await fetch(req.body.image_url);
        const arrayBuffer = await response.arrayBuffer();
        imageData = Buffer.from(arrayBuffer).toString("base64");
        mimeType = response.headers.get('content-type') || 'image/jpeg';
      } else {
        return res.status(400).json({ error: "No image provided" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({ search_term: "Pickle" });
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = "You are a food identification assistant for an Indian grocery store. Look at this image and reply ONLY with the name of the food item or dish. Keep it to 1 to 3 words maximum.";
      
      const imageParts = [{ inlineData: { data: imageData, mimeType: mimeType } }];
      const result = await model.generateContent([prompt, ...imageParts]);
      const foodName = result.response.text().trim();

      res.json({ search_term: foodName });
    } catch (error) {
      console.error("Gemini AI Error:", error);
      let fallback = "Snacks";
      if (req.body && req.body.image_url) {
        const clean = req.body.image_url.split('/').pop().split('.')[0].replace(/[-_]/g, ' ');
        if (clean && clean.length > 2) fallback = clean;
      }
      res.json({ search_term: fallback });
    }
  });

  return router;
};
