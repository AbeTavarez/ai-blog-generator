import { getBlogs, handleCompletion } from "@/actions";
import clientPromise from "@/db/mongoDb";
import { ObjectId } from "mongodb";
import Link from "next/link";

interface BlogPageProps {
  params: {
    blogId: string;
  };
}

interface Blog {
  title: string;
  content: string;
  keywords: string[];
  createdAt: Date;
}

export default async function BlogPage(props: BlogPageProps) {
  const blogs = await getBlogs();

  return (
    <main className="grid h-screen grid-cols-[.2fr_1fr]">
      {/* SECTION 1 */}
      <section className="bg-gray-700 text-white">
        <h2>Blogs</h2>

        {blogs &&
          blogs.map((blog) => (
            <h3 key={blog._id.toString()} className="p-5">
              {blog.title}
            </h3>
          ))}
        <Link href="#" className="btn ml-5">
          Sign Out
        </Link>
      </section>

      {/* SECTION 2 */}
      <section className="bg-gray-950 flex flex-col text-white">
        {/* INFO  */}
        <div className="flex-1 p-10">
          {/* <h2 className="text-2xl font-extrabold font-serif">
            Unleash creativity!
          </h2> */}
          <h2>Title: {blogs.at(-1).title}</h2>
          <div  dangerouslySetInnerHTML={{__html: blogs && blogs<Blog[]>.at(-1).content}}></div>

        </div>

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
