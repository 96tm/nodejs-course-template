import fs from 'fs';
import express from 'express';

export class Logger {
  requestsWriteStream: fs.WriteStream;
  errorsWriteStream: fs.WriteStream;

  constructor(
    requestsLogFilename: string,
    errorsLogFilename: string,
    private unhandledErrorsFilename: string
  ) {
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

  logUncaughtError(err: Error): void {
    const errorString = `${err} ${err.stack}`;
    fs.writeFileSync(this.unhandledErrorsFilename, errorString);
  }

  logUnhandledRejection(err: PromiseRejectionEvent): void {
    this.errorsWriteStream.write(`Unhandled promise rejection: ${err} \n`);
  }

  logError(
    err: Error,
    req?: express.Request,
    res?: express.Response,
    next?: express.NextFunction
  ): void {
    this.errorsWriteStream.write(`JSON.stringify(err)\n`);
    if (next) {
      next(err);
    }
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
    const request = `Status code: ${res.statusCode}; method: ${req.method}; url: ${req.url}; ${queryParamsString}; ${bodyString} \n`;
    this.requestsWriteStream.write(request);
    next();
  }
}
