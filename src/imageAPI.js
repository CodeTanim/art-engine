// imageAPI.js

export async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  