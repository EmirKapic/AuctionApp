import app from "firebase/Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import FileManager from "./FileManager";

class FirebaseFileManager implements FileManager {
  uploadFile(file: File): Promise<string> {
    app;
    const storage = getStorage();
    const storageRef = ref(storage, URL.createObjectURL(file));
    return uploadBytes(storageRef, file).then(() => {
      return getDownloadURL(storageRef);
    });
  }
}
export default FirebaseFileManager;
