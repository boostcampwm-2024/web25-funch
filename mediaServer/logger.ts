import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import process from 'process';
import path from 'path';

const { combine, timestamp, label, printf } = winston.format;

const logDir = `${process.cwd()}/logs`;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const createWinstonDaily = (levelName: string) => {
  return new winstonDaily({
    level: levelName,
    datePattern: 'YYYY-MM-DD',
    dirname: path.join(logDir, levelName),
    filename: `%DATE%.${levelName}.log`,
    maxFiles: 30,
    zippedArchive: true,
  });
};

const logger = winston.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), label({ label: 'Media Server' }), logFormat),
  transports: [
    createWinstonDaily('warn'),
    createWinstonDaily('debug'),
    createWinstonDaily('info'),
    createWinstonDaily('error'),
  ],
});

export { logger };
