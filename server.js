const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

messages = [];

app.post("/chatbot", async (req, res) => {
  const message = req.body.message;

  console.log(message);
  messages.push({
    role: "user",
    content: message,
  });
 

  try {
    console.log(messages);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const botResponse = response.choices[0].message.content;
    res.json({ response: botResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: "Error" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
