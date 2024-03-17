import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Module({
  controllers: [DocumentController],
  providers: [DocumentService, FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      const ext = extname(file.originalname).toLowerCase();
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
    },
  })],
  imports: [MulterModule.register({
    dest: "./uploads"
  })]
})
export class DocumentModule {}
