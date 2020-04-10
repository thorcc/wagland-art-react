import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };
  

class Firebase {
    constructor(){
        app.initializeApp(config);

        this.db = app.firestore();

        this.paintings = this.db.collection("paintings");
        
        this.storage = app.storage();
        this.storageRef = this.storage.ref();

        this.uploadImage = async (file, name) =>  {
            try{
                const storRes = await this.storage.ref().child(file.name).put(file);
                /*const dbRes = await this.paintings.add({
                    name,
                    imageUrl
                });
                */
                return `Image added succesfully.`
            }
            catch(err){
                return err;
            }
        }

    }
}

export default Firebase;