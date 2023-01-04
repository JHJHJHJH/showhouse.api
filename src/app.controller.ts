import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseMessage } from './decorators/message.decorator';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/env')
  getEnvVars(): void {
    this.appService.logEnvVariables();
  }

  @Get('/transformed')
  @ResponseMessage('TEST MESSAGE')
  @UseInterceptors(TransformInterceptor)
  getTransformed(): number[] {
    return [1, 2, 3, 4];
  }
}
