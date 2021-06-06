import fs from 'fs';
import express from 'express';
import { INextFunction } from '../common/INextFunction';

export class Logger {
  writeStream: fs.WriteStream;

  constructor(filename: string) {
    this.writeStream = fs.createWriteStream(filename, { flags: 'a' });
    this.writeStream.on('error', (err) => {
      console.log('error', err);
    });
  }

  log(req: express.Request, res: express.Response, next: INextFunction): void {
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const bodyString = body !== '{}' ? `body: ${body}` : 'no body';
    const queryParamsString =
      query !== '{}' ? `query parameters: ${query}` : 'no query parameters';
    const request = `Status code: ${res.statusCode}; method: ${req.method}; url: ${req.url}; ${queryParamsString}; ${bodyString}`;
    this.writeStream.write(request);
    this.writeStream.write('\n');
    next();
  }
}
