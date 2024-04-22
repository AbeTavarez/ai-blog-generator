"use client";
import { useState, useEffect } from "react";
import { getBlogs } from "@/actions";
import { Blog } from "@/types";

export default function BlogPost() {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      let data = await getBlogs();
      setBlogs(data);
    }
    fetchData();
  }, [blogs]);

  return (
    <>
      {!blogs?.length ? (
        <div className="flex-1 p-5 overflow-auto flex justify-center items-center">
            <h2 className="text-2xl">Start creating today</h2>
        </div>
      ) : (
        <>
          {/* INFO  */}
          <div className="flex-1 p-5 overflow-auto">
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
    </>
  );
}
