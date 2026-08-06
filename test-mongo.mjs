import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://campusiq:CampusIQ2006@campusiq.beox5py.mongodb.net/campus_ai_management?retryWrites=true&w=majority&appName=CampusIQ";

try {
  const client = new MongoClient(uri);

  await client.connect();

  console.log("✅ Connected");

  await client.close();
} catch (err) {
  console.error(err);
}