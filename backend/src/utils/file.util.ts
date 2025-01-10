import * as fs from 'fs';
import * as path from 'path';

export class FileUtil {
  static async writeFile(filePath: string, data: string): Promise<void> {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    return fs.promises.writeFile(filePath, data);
  }

  static async readFile(filePath: string): Promise<string> {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    return fs.promises.readFile(filePath, 'utf8');
  }

  static async deleteFile(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      return fs.promises.unlink(filePath);
    }
  }
}
