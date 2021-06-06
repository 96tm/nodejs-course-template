import fs from 'fs';
import express from 'express';

export class Logger {
  requestsWriteStream: fs.WriteStream;
  errorsWriteStream: fs.WriteStream;

  constructor(requestsLogFilename: string, errorsLogFilename: string) {
    this.requestsWriteStream = fs.createWriteStream(requestsLogFilename, {
      flags: 'a',
    });
    this.errorsWriteStream = fs.createWriteStream(errorsLogFilename, {
      flags: 'a',
    });
    this.requestsWriteStream.on('error', this.handleLoggerError);
    this.errorsWriteStream.on('error', this.handleLoggerError);
  }

  handleLoggerError(err: Error): void {
    console.log('Logger error', err);
  }

  logError(
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    this.errorsWriteStream.write(JSON.stringify(err));
    this.errorsWriteStream.write('\n');
    next(err);
  }

  log(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const bodyString = body !== '{}' ? `body: ${body}` : 'no body';
    const queryParamsString =
      query !== '{}' ? `query parameters: ${query}` : 'no query parameters';
    const request = `Status code: ${res.statusCode}; method: ${req.method}; url: ${req.url}; ${queryParamsString}; ${bodyString}`;
    this.requestsWriteStream.write(request);
    this.requestsWriteStream.write('\n');
    next();
  }
}
