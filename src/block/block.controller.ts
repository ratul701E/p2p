import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {
    constructor(private readonly blockService: BlockService) {}
}
