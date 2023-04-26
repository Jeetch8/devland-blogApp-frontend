import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { uploadFileToS3 } from '@src/utils/fileUploader';

export const optimizeAndUploadProfileImage = async (file: Express.Multer.File, size: number) => {
  const originalFilePath = path.resolve(__dirname, '..', '..', '..', 'uploads', file.filename);
  const convertedImageBuffer = await sharp(file.path).toFormat('jpeg').toBuffer();
  const convertedFileName = file.filename + Date.now();
  const convertedFilePath = path.resolve(__dirname, '..', '..', '..', 'uploads', 'processed_images', 'original', convertedFileName + '.jpeg');
  await storeImageLocally(originalFilePath, convertedFilePath, convertedImageBuffer);
  const originalImageUrl = await uploadFileToS3({
    filePath: convertedFilePath,
    bucketName: 'propsbucket0',
    newFileNameKey: convertedFileName + '.jpeg',
  });
  const imageOptimizedBuffer = await sharp(convertedFilePath).resize(size, size).toBuffer();
  const resizedFileName = convertedFileName + `-${size}x${size}` + '.jpeg';
  const resizedFilePath = path.resolve(__dirname, '..', '..', '..', 'uploads', 'processed_images', 'resized', resizedFileName);
  await storeImageLocally(convertedFilePath, resizedFilePath, imageOptimizedBuffer);
  const resizedImageUrl = await uploadFileToS3({ filePath: resizedFilePath, bucketName: 'propsbucket0', newFileNameKey: resizedFileName });
  return { originalImageUrl, resizedImageUrl };
};

const storeImageLocally = (originalFilePath: string, filePathToStore: string, buffer: Buffer) => {
  fs.mkdirSync(path.dirname(originalFilePath), { recursive: true });

  return new Promise((resolve, reject) => {
    fs.writeFile(filePathToStore, buffer, err => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const deleteImageLocally = async (filePath: string) => {
  if (fs.existsSync(filePath)) {
    try {
      await fs.promises.unlink(filePath);
      console.log(`File ${filePath} deleted successfully`);
    } catch (err) {
      console.error(`Error deleting file ${filePath}:`, err);
    }
  } else {
    console.log(`File ${filePath} does not exist`);
  }
};

const deleteAllPrevImages = async (folderPath: string) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory:`, err);
    } else {
      for (const file of files) {
        fs.unlink(path.join(folderPath, file), err => {
          if (err) {
            console.error(`Error deleting file ${file}:`, err);
          } else {
            console.log(`File ${file} deleted successfully`);
          }
        });
      }
    }
  });
};
