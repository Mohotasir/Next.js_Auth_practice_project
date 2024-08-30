import { MongoClient, ServerApiVersion } from "mongodb";
let client;
let db;

export const connectDB = async () => {
  if (db) return db;

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    db = client.db("car_doctor");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
