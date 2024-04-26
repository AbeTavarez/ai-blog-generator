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
      <section className="bg-gray-700 text-white flex flex-col overflow-y-hidden hover:overflow-y-auto">
        <div className="flex-1 max-w-64">
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
          <BlogPost />      
      </section>
    </main>
  );
}
