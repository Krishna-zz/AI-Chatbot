import { useState } from "react";


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

    const data = await res.json();         //it converts backend response to json 

    setMessages(m => [...m, {role: "Krishna", text: data.reply}])
    setInput("")
   }


  return (
      <div className="p-20">
         <h2>🕉️ Krishna AI</h2>

         {
            messages.map((m, i) => {
                <p key={i}><b>{m.role}:</b> {m.text}</p>
            })
         }

         <input  
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Share you problem...."/>

          <button onClick={send}>Ask</button>
      </div>
  );
}


export default Chatbox