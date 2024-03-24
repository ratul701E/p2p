import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getLocalIp } from './main';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags("Main")
  @ApiOkResponse({description:"Staking information of one node"})
  @Get('/info')
  info(){
    return {
      public_key: "0x0001",
      staking_coin: 100,
      addr: getLocalIp()+":3000"
    }
  }
}
