export interface inputFile {
  name: string;
  language: string;
  value: string;
}

export interface fileType {
  [index: string]: inputFile;
}
