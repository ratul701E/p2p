import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    info(): {
        public_key: string;
        staking_coin: number;
        addr: string;
    };
}
