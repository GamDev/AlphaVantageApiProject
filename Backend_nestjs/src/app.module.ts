import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AlphaVantageController } from './alpha-vantage.controller';
import { AlphaVantageService } from './alpha-vantage.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true})],
  controllers: [AlphaVantageController],
  providers: [AlphaVantageService],
})
export class AppModule {}
