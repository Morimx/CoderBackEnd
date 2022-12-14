import admin from "firebase-admin";
import config from "../../configdb.js";

admin.initializeApp({
    credential: admin.credential.cert(config.FireBase),
    databaseURL: "https://coderback-21c69.firebaseio.com"
});

const db = admin.firestore();

class CRUDFireBase {
    constructor(collection) {
        this.db = db;
        this.collection = db.collection(collection);
    }

    async create(data) {
        try {
            const result = await this.collection.add(data);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async read() {
        try {
            const result = await this.collection.get();
            const docs = result.docs;
            const output = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            return output;
        } catch (error) {
            console.log(error);
        }
    }

    async readById(id) {
        try {
            const result = await this.collection.doc(id).get();
            return result.data();
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, data) {
        try {
            const result = await this.collection.doc(id).update(data);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const result = await this.collection.doc(id).delete();
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

export default CRUDFireBase;