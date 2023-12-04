import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./Firebase";

export default async function uploadFile(file: File): Promise<string> {
  app;
  const storage = getStorage();
  const storageRef = ref(storage, URL.createObjectURL(file));
  return uploadBytes(storageRef, file).then(() => {
    return getDownloadURL(storageRef);
  });
}
