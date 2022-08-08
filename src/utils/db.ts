import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

class Database {
  private instance: Firestore;

  constructor() {
    if (!process.env.GCLOUD_CERT_FILE_PATH) {
      throw new Error("GCloud certificate path is missing!");
    }
    initializeApp({
      credential: cert(process.env.GCLOUD_CERT_FILE_PATH!),
    });
    this.instance = getFirestore();
  }

  async getAll() {
    const res = await this.instance.collection("sales").get();
    const results: any[] = [];
    res.forEach((doc) => results.push(doc.data()));
    return results;
  }
}

export default new Database();
