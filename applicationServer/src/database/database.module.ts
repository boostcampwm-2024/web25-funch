import { Module } from '@nestjs/common';
import { databaseProvider } from '@database/database.providers';

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
