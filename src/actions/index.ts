"use server";
import OpenAI from "openai";
import clientPromise from "@/db/mongoDb";
import { revalidatePath } from "next/cache";
import { Blog } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Handle Completion
 * @param formData
 */
export async function handleCompletion(userPrompt: string) {
  // check topic
  // const blogTopic = formData.get("user_prompt") as string;
  const blogTopic = userPrompt;
  console.log(blogTopic);

  // DB Client
  const client = await clientPromise;
  const db = client.db("bloggenerator");

  // Prompt
  const prompt = `Write a long and detailed blog SEO-friendly blog post about ${blogTopic.trim()}, targeting relevant keywords. The content should be formatted in SEO-friendly HTML including a HTML title tag and meta description.
  The output format must be an JSON object with the following format:
  {
    "title": title here,
    "content": blog post here,
    "metadata": meta description here,
    "keywords": relevant keywords here 
  } 
  `;

  try {
    // API call
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a professional writer" },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 2500,
    });

    console.log(completion.choices[0].message.content);

    // Generated blog
    const content = completion.choices[0].message.content;

    if (!content) {
      throw new Error("Error generating content!");
      
    }
    
    // Save Blog
    const parsedContent = JSON.parse(content);
    const blog = await db.collection("blogs").insertOne({
      ...parsedContent,
      createdAt: new Date()
    });
    console.log(blog);

    //TODO:
    if (blog) {
      //? Add it later
      revalidatePath("/blogs");
    }
  } catch (e) {
    console.log("Error with OPEN AI: ", e);
  }
}

/**
 * Get Blogs
 */
export async function getBlogs() {
  const client = await clientPromise;
  const db = client.db("bloggenerator");
  const blogs = await db.collection<Blog>("blogs").find().toArray();
  // console.log(blogs);
  // return blogs;
  // Convert _id from ObjectId to string
  const blogsWithStrId = blogs.map(blog => {
    const { _id, ...rest } = blog;
    return {
      ...rest,
      _id: _id.toString()
    };
  });

  return blogsWithStrId;
}
