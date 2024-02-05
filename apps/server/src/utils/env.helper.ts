import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'development.env';
  let filePath: string = resolve(`${dest}/${filename}`);
  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
