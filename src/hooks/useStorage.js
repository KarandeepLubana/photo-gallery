import { useState, useEffect } from "react";
import { storage, firestore, timestamp } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

// Reusable code

// hook for uploading/storing file into firebase storage
// (https://firebase.google.com/docs/storage/web/start)

const useStorage = (file) => {
  const user = useAuth().user;
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = storage.ref(file.name); // Creating a reference to the path of the file
    const collectionRef = firestore.collection(`users/${user.uid}/images`); // Creating a "images" collection

    // Async function (https://firebase.google.com/docs/storage/web/upload-files)
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        // Handle unsuccessful uploads
        setError(error);
      },
      async () => {
        // Handle successful uploads on complete
        const url = await storageRef.getDownloadURL();

        const createdAt = timestamp();

        // Add a new document in collection "images" with fields url, createdAt
        collectionRef.add({ url, createdAt });

        setUrl(url);
      }
    );
  }, [file, user.uid]);

  return { progress, url, error };
};

export default useStorage;
