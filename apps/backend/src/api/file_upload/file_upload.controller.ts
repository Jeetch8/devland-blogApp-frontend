import { Request, Response } from 'express';
import { optimizeAndUploadProfileImage } from './file_upload.services';

export const uploadProfileImage_controller = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  try {
    const { originalImageUrl, resizedImageUrl } = await optimizeAndUploadProfileImage(file, 200);
    res.status(200).json({ success: true, originalImageUrl, resizedImageUrl });
  } catch (error) {
    res.status(500).json({ message: 'error uploading file', error });
  }
};
