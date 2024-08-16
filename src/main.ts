import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import os from 'os'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const PORT = process.argv[process.argv.indexOf("--port") + 1]
  app.enableCors()
  const PORT = 3000 
  const config = new DocumentBuilder()
    .setTitle('DCLink - A Decentralized Peer-to-Peer Network')
    .setDescription('The primary goal of this project is to create a robust and user-friendly blockchain simulation platform that replicated key features of a real world blockchain network.By implementing functionalities such as decentralized transaction processing, smart contracts, gas fees, and wallet management, this project aims to provide users an experience of blockchain technology. Additionally, the development of frontend features such as block explorer and wallet aims to inhance user experience. This project aims to promote understanding and adoption of blockchain technology while offering users a practical environment to explore and experiment with blockchain concepts and applications.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('p2p', app, document);
  

  await app.listen(PORT, getLocalIp());
  console.log("Running on: " + getLocalIp() + ":" + PORT)
}

bootstrap();

export const getLocalIp = () : string => {
  const networkInterfaces = os.networkInterfaces();
  console.log(networkInterfaces)
  for(const value of networkInterfaces['en0'] ){
    if (value.family === 'IPv4') {
      return value.address
    }
  }
  return ''
}