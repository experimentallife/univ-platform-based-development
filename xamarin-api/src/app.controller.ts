import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendEmailDto } from './app.entities';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send')
  send(@Body() dto: SendEmailDto) {
    return this.appService.send(dto);
  }
}
