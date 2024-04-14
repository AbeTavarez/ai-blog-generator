import { handleCompletion } from "@/actions";
import clientPromise from "@/db/mongoDb";
import { ObjectId } from "mongodb";
import Link from "next/link";

interface BlogPageProps {
  params: {
    blogId: string;
  };
}

export default async function BlogPage(props: BlogPageProps) {
  const client = await clientPromise;
  const db = client.db("bloggenerator");
  const blogs = await db
    .collection("blogs")
    .find().toArray();
console.log(blogs);
    
  // const latestBlog = await db
  //   .collection("blogs")
  //   .findOne({ _id: new ObjectId(props.params.blogId) });
  //   console.log(latestBlog);
    
  return (
    <main className="grid h-screen grid-cols-[.2fr_1fr]">
      {/* SECTION 1 */}
      <section className="bg-gray-700 text-white">
        <h2>Blogs</h2>
        <Link href="#" className="btn">
          Sign Out
        </Link>
      </section>

      {/* SECTION 2 */}
      <section className="bg-gray-950 flex flex-col text-white">
        {/* INFO  */}
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-2xl font-extrabold font-serif">
            Unleash creativity!
          </h2>
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
