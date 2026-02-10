import { useState } from "react";
import ollama from "ollama"

function Chatbox (){

   const [input, setInput] = useState("");
   const [messages, setMessages] = useState([])


   const send = async() => {

    if (!input) return;

    setMessages([...messages, {role: "You", text: input}])

    const res = await fetch("http://localhost:3000/chat" , {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: input})
    })

    const data = await res.json();

    setMessages(m => [...m, {role: "Krishna", text: data.reply}])
   }


  return (
      <div className="bg-amber-500">Krishna</div>
  );
}


export default Chatbox