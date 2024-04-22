import { getBlogs, handleCompletion } from "@/actions";
import BlogPost from "@/components/blog-post";
import Generating from "@/components/generating";
import Link from "next/link";
import { Suspense } from "react";

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="grid h-screen grid-cols-[.2fr_1fr]">
      {/* SECTION 1 */}
      <section className="bg-gray-700 text-white flex flex-col">
        <div className="flex-1">
          {blogs &&
            blogs.map((blog) => (
              <h3 key={blog._id.toString()} className="p-5">
                {blog.title}
              </h3>
            ))}
        </div>
        <Link href="#" className="btn mx-5 mb-5">
          Sign Out
        </Link>
      </section>

      {/* SECTION 2 */}
      <section className="bg-gray-950 flex flex-col text-white overflow-auto">
        <Suspense fallback={<Generating />}>
          <BlogPost />
        </Suspense>

        {/* FORM      */}
        <div className=" bg-gray-800 p-10">
          <form action={handleCompletion}>
            <fieldset className="flex gap-2">
              <label htmlFor="user_prompt"></label>
              <textarea
                name="user_prompt"
                id="user_prompt"
                className="w-full resize-none rounded-md text-black"
                placeholder="Create a new blog post about..."
              />

              <button type="submit" className="btn">
                Create
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </main>
  );
}
