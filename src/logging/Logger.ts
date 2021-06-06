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
    console.error('Logger error', err);
  }

  logUncaughtError(err: Error): void {
    const errorString = `${err.stack}`;
    console.error(errorString);
    fs.writeFileSync(this.unhandledErrorsFilename, errorString);
  }

  logUnhandledRejection(err: PromiseRejectionEvent): void {
    console.error(`Unhandled promise rejection: ${err}`);
    this.errorsWriteStream.write(`Unhandled promise rejection: ${err} \n`);
  }

  logError(
    err: Error,
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction
  ): void {
    const requestInfo = Logger.getErrorRequestInfo(req, res);
    console.error(`${requestInfo}; error: ${JSON.stringify(err)}`);
    this.errorsWriteStream.write(
      `${requestInfo}; error: ${JSON.stringify(err)}\n`
    );
    if (next) {
      next(err);
    }
  }

  log(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const requestInfo = Logger.getRequestInfo(req, res);
    console.log(requestInfo);
    this.requestsWriteStream.write(`${requestInfo}\n`);
    next();
  }

  private static getRequestInfo(
    req: express.Request,
    res: express.Response
  ): string {
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const bodyString = body !== '{}' ? `body: ${body}` : 'no body';
    const queryParamsString =
      query !== '{}' ? `query parameters: ${query}` : 'no query parameters';
    const requestInfo = `status code: ${res.statusCode}; method: ${req.method}; url: ${req.url}; ${queryParamsString}; ${bodyString}`;
    return requestInfo;
  }

  private static getErrorRequestInfo(
    req: express.Request,
    res: express.Response
  ) {
    const requestInfo = Logger.getRequestInfo(req, res);
    const errorRequestInfo = requestInfo.split(';').slice(1).join(';');
    return errorRequestInfo;
  }
}
