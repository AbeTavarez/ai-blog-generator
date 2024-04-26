"use client";
import { useState, useEffect, FormEvent } from "react";
import { getBlogs, handleCompletion } from "@/actions";
import Generating from "./generating";
import { Blog } from "@/types";

export default function BlogPost() {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    let data = await getBlogs();
    setBlogs(data);
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await handleCompletion(userPrompt);
      await fetchBlogs();
      setLoading(false);
      setUserPrompt('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <> 
      {loading ? <Generating /> : blogs && (
        <>
          {/* INFO  */}
          <div className="flex-1 p-10 overflow-y-hidden hover:overflow-y-auto">
            {/* <h2 className="text-2xl font-extrabold font-serif">
            Unleash creativity!
          </h2> */}

            {/* TITLE  */}
            <h2 className="text-2xl mb-2">Title: {blogs.at(-1)?.title}</h2>

            {/* METADATA  */}
            <div className="mb-2">
              <h2 className="text-2xl">Metadata: </h2>
              <p>{blogs.at(-1)?.metadata}</p>
            </div>

            {/* CONTENT  */}
            <div className="mb-2">
              <h2 className="text-2xl">Content: </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: blogs.at(-1)?.content || "",
                }}
              ></div>
            </div>

            {/* KEYWORDS  */}
            <div className="">
              <h2 className="text-2xl">Keywords:</h2>
              <div className="flex">
                {blogs
                  .at(-1)
                  ?.keywords.split(",")
                  .map((k) => (
                    <h6 key={k}>{`#${k} `}</h6>
                  ))}
              </div>
            </div>
          </div>
          </>
      )}
          {/* FORM      */}
        <div className=" bg-gray-800 p-10">
          <form onSubmit={handleSubmit}>
            <fieldset className="flex gap-2">
              <label htmlFor="user_prompt"></label>
              <textarea
                name="user_prompt"
                id="user_prompt"
                className="w-full resize-none rounded-md text-black"
                placeholder="Create a new blog post about..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />

              <button type="submit" className="btn">
                Create
              </button>
            </fieldset>
          </form>
        </div>

    </>
  );
}
