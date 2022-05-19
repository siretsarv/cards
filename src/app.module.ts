import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DeckModule} from "./deck/deck.module";
import {DatabaseModule} from "./database/database.module";

@Module({
  imports: [
      DatabaseModule,
      DeckModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
