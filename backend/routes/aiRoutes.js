const express = require('express');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = function(upload) {
  const router = express.Router();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  router.post('/visual-search', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No image provided" });

      const imagePath = req.file.path;
      const imageData = fs.readFileSync(imagePath).toString("base64");
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = "You are a food identification assistant for an Indian grocery store. Look at this image and reply ONLY with the name of the food item or dish. Keep it to 1 to 3 words maximum.";
      
      const imageParts = [{ inlineData: { data: imageData, mimeType: req.file.mimetype } }];
      const result = await model.generateContent([prompt, ...imageParts]);
      const foodName = result.response.text().trim();

      fs.unlinkSync(imagePath);
      res.json({ search_term: foodName });
    } catch (error) {
      console.error("Gemini AI Error:", error);
      res.status(500).json({ error: "AI failed to analyze image" });
    }
  });

  return router;
};
