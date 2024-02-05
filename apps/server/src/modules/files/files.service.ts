import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { extname, resolve, join } from 'node:path';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileExt = extname(file.originalname);
      const fileName = randomUUID() + fileExt;
      const filePath = resolve(__dirname, '..', 'static');
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      writeFileSync(join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createFiles(files: any[]): Promise<string[]> {
    try {
      const fileNames = [];
      for (const file of files) {
        const fileExt = extname(file.originalname);
        const fileName = randomUUID() + fileExt;
        const filePath = resolve(__dirname, '..', 'static');
        if (!existsSync(filePath)) {
          mkdirSync(filePath, { recursive: true });
        }
        writeFileSync(join(filePath, fileName), file.buffer);
        fileNames.push(fileName);
      }
      return fileNames;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файлов',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
