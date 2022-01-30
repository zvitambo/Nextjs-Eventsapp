import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://zvitambo:nataliee@cluster0.bwf1d.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

export async function InsertDocument(client, collection,  document) {
  const db = client.db();

 return  await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort) {
    const db = client.db();
    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray();

      return documents;
}
