declare module '../config/firebase' {
    import { FirebaseApp } from 'firebase/app';
    import { FirebaseStorage } from 'firebase/storage';
  
    const app: FirebaseApp;
    const storage: FirebaseStorage;
    export { app, storage };
  }
  