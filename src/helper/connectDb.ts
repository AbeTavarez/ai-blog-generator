import clientPromise from "@/db/mongoDb";

export const connectDB = async () => {
  const client = await clientPromise;
  const db = await client.db("bloggenerator");
  return db;
};
