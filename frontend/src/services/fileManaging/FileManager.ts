export default interface FileManger {
  uploadFile(file: File): Promise<string>;
}
