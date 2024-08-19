import fs from "fs";

export const getTime = () => new Date().toISOString();
export const isFolder = (path) => {
  try {
    return fs.statSync(path).isDirectory();
  } catch (error) {
    return false;
  }
}