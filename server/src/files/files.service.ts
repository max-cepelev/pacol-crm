import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { extname, resolve, join } from 'path';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileExt = extname(file.originalname);
      const fileName = uuidv4() + fileExt;
      const filePath = resolve(__dirname, '..', 'static');
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      writeFileSync(join(filePath, fileName), file.buffer);
      const url = process.env.API_URL
        ? process.env.API_URL + fileName
        : fileName;
      return url;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createFiles(files: any[]): Promise<string[]> {
    try {
      const urls = [];
      for (const file of files) {
        const fileExt = extname(file.originalname);
        const fileName = uuidv4() + fileExt;
        const filePath = resolve(__dirname, '..', 'static');
        if (!existsSync(filePath)) {
          mkdirSync(filePath, { recursive: true });
        }
        writeFileSync(join(filePath, fileName), file.buffer);
        const url = process.env.API_URL
          ? process.env.API_URL + fileName
          : fileName;
        urls.push(url);
      }
      return urls;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файлов',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
