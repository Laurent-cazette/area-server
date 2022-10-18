import { Body, Controller, Get, Ip, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AboutType } from './types/about';
import { AreaStatusType } from './types/status';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("about.json")
  getAboutJson(@Ip() ip): AboutType {
    return this.appService.getAboutJson(ip);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  userLogin(@Request() req): Promise<any> {
    return this.appService.userLogin(req.user);
  }

  @Post("register")
  userRegister(@Request() req): Promise<any> {
    return this.appService.userRegister(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post("subscribe/:serviceId")
  subscribeToService(@Param('serviceId') serviceId): AreaStatusType {
    return this.appService.subscribeToService(serviceId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("createArea/:actionId/:reactionId")
  async poc(@Body() body, @Param('actionId') actionId : number,
                          @Param('reactionId') reactionID: number): Promise<AreaStatusType> {
    return this.appService.createArea(body, actionId, reactionID);
  }
}
