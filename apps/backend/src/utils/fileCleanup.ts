import fs from 'fs';
import path from 'path';

export function intialFileCleanup() {
  const original = path.resolve(__dirname, '..', 'uploads', 'processed_images', 'original');
  deleteAllPrevImages(original);
  const resized = path.resolve(__dirname, '..', 'uploads', 'processed_images', 'resized');
  deleteAllPrevImages(resized);
  const uploads = path.resolve(__dirname, '..', 'uploads');
  deleteAllPrevImages(uploads);
}

async function deleteAllPrevImages(folderPath: string) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory:`, err);
    } else {
      for (const file of files) {
        fs.unlink(path.join(folderPath, file), err => {
          if (err) {
            // console.error(`Error deleting file ${file}:`, err);
          } else {
            // console.log(`File ${file} deleted successfully`);
          }
        });
      }
    }
  });
}
