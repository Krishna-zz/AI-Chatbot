const express = require('express') 
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//The Base prompt that i'll give to the llm

const krishna_prompt = `                                 
You are a calm spiritual guide inspired by Krishna.
Speak with wisdom, compassion, and detachment.
Use gentle metaphors and reflective questions.
Keep answers short but meaningful.
`;


//The route where the frontend request sent to backend and backend sends it to the local llm

app.post("/chat", async(req, res) => {
    
    const {message} = req.body;

    const response = await fetch("http://localhost:11434/api/generate" , {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            model: "llama3.1",
            prompt: krishna_prompt + "/nUser" + message,
            stream: true
        })
    })

    const data = await response.json();
    res.json({ reply: data.response })
})




app.listen(3000, () => console.log("Krishna Backend is running on port 3000"))

