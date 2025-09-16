const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // reads it from your .env
});

dotenv.config()