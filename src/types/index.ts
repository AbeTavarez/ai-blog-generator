import { ObjectId } from "mongodb";

/**
 * Blog
 */
export interface Blog {
    _id: ObjectId
    title: string;
    content: string;
    keywords: string;
    metadata: string;
    createdAt: Date;
  }