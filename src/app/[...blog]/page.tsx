import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="grid h-screen grid-cols-[.5fr_1fr]">
      {/* SECTION 1 */}
      <section className="bg-slate-500">
        <h2>Chats</h2>
        <Link href="#" className="btn">
          Sign Out
        </Link>
      </section>

      {/* SECTION 2 */}
      <section className="bg-slate-700 flex flex-col">
        {/* INFO  */}
        <div className="flex-1">
          <h2>Unleash creativity</h2>
        </div>

        {/* FORM      */}
        <div className=" bg-slate-600 p-10">
          <form>
            <fieldset className="flex gap-2">
              <label htmlFor="user_prompt"></label>
              <textarea
                name="user_prompt"
                id="user_prompt"
                placeholder="Create a new blog post..."
                className="w-full resize-none rounded-md"
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
