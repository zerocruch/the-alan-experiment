import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI || "";
const DB_NAME = "the_alan_experiment";
const COLLECTION_NAME = "backlogs";

const endDate = new Date("2024-12-22T20:00:00Z");

function filterPostsByDate(posts, date) {
  const filterDate = new Date(date);
  return posts.filter((post) => new Date(post.created_at) > filterDate);
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = new MongoClient(MONGO_URI);

      await client.connect();
      const database = client.db(DB_NAME);
      const collection = database.collection(COLLECTION_NAME);

      const messages = await collection.find().toArray();

      await client.close();

      const { date } = req.body;

      if (!date) {
        return res.status(200).json({
          data: messages,
        });
      } else {
        const filteredPosts = filterPostsByDate(messages, date);
        return res.status(200).json({
          data: filteredPosts,
        });
      }

      //const filteredPosts = filterPostsByDate(posts, '2024-12-30T16:50:00.000Z');

      /*const hasWon = messages.some((item) => item.won === true);

      const currentDate = new Date();
      console.log(currentDate);
      const gameOver = currentDate.getTime() >= endDate.getTime();*/
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
}
