import admin from "firebase-admin";
import { getFirestore, Firestore } from "firebase-admin/firestore";

class Database {
  private instance: Firestore;

  constructor() {
    if (!process.env.GCLOUD_CERT_FILE_PATH) {
      throw new Error("Google Cloud certificate path is missing!");
    }
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(process.env.GCLOUD_CERT_FILE_PATH!),
      });
    }
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
