"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleCompletion(formData: FormData) {
  const prompt = formData.get("user_prompt") as string;
  console.log(prompt);

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices[0].message.content);
      
    } catch (e) {
      console.log("Error with OPEN AI: ", e);
    }
  
}
