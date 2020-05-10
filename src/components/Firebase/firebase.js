import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

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

        this.paintingsColl = this.db.collection("paintings");
        this.paintings = this.db.collection("index").doc("paintings");
        this.bio = this.db.collection("index").doc("bio");
        this.contact = this.db.collection("index").doc("contact")       
        this.storage = app.storage();
        this.storageRef = this.storage.ref();
        this.auth = app.auth();

        this.uploadImage = async (file, name) =>  {
            try{
                const storRes = await this.storage.ref().child(file.name).put(file);
                return `Image added succesfully.`
            }
            catch(err){
                return err;
            }
        }
    }
    // *** Auth API ***
 
    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;