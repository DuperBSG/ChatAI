
// let API_KEY = 'sk-proj-VlxHDZM6WxQ8LiVP7DMMT3BlbkFJRL7GwgVqdIAmWUpprv2hv'
let API_KEY = ''


export function setAPIKey(key) {
  API_KEY = key
}

export default async function processMessage(messages) {

  console.log(API_KEY)
  let response = ""
  
  const apiRequestBody = {
    "model": "gpt-3.5-turbo-0125", 
    messages
  }

  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(apiRequestBody)
  }).then(response => {
    if (!response.ok) {
      throw new Error("Invalid API Key! Please re-enter!");
    }
    return response.json();
  })
  .then(data => {
    response = data.choices[0].message.content;
    console.log(response);
  })
  .catch(error => {
    alert("Invalid API Key! Please re-enter!");
  });

  return response
}




  // "messages": [
    //   {
    //     role: "system",
    //     content: "Explain all concepts like I am a professional."
    //   },
    //   {
    //     role: "assistant",
    //     content: "You are a helpful assistant designed to output JSON.",
    //   },
    //   { 
    //     role: "user", 
    //     content: message 
    //   },
    // ],