import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI || "";
const DB_NAME = "the_alan_experiment";
const COLLECTION_NAME = "backlogs";

const endDate = new Date("2024-12-22T20:00:00Z");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = new MongoClient(MONGO_URI);

      await client.connect();
      const database = client.db(DB_NAME);
      const collection = database.collection(COLLECTION_NAME);

      const messages = await collection.find().toArray();

      await client.close();

      /*const hasWon = messages.some((item) => item.won === true);

      const currentDate = new Date();
      console.log(currentDate);
      const gameOver = currentDate.getTime() >= endDate.getTime();*/

      return res.status(200).json({
        data: messages,
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
}
