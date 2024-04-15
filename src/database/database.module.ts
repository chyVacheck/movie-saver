// database.module.ts

// ! modules
// nestjs
import { Module } from '@nestjs/common';

// ? providers
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
