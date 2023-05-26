// imageAPI.js

export async function query(data) {
  console.log(process.env.REACT_APP_API_KEY);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  