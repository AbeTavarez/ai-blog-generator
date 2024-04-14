"use server";
import OpenAI from "openai";
import clientPromise from "@/db/mongoDb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleCompletion(formData: FormData) {
  const prompt = formData.get("user_prompt") as string;
  console.log(prompt);

  // db
  const client = await clientPromise;
  const db = client.db("bloggenerator");

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0].message.content);

    const genBlog = completion.choices[0].message.content;

    const blog = await db.collection("blogs").insertOne({ blog: genBlog });
    console.log(blog);
    //TODO:
    if (blog) {
      revalidatePath("/blogs");
      // redirect(`/blogs/${blog.insertedId.toString()}`);
    }
    
  } catch (e) {
    console.log("Error with OPEN AI: ", e);
  }
}
