import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  @Render('home')
  getHello() {
    // return "this._appService.getHello()";
  }
}
