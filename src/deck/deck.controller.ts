import {Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Query} from "@nestjs/common";
import {DeckService} from "./deck.service";
import {CreateDeckRequestDto} from "./DTO/create-deck-request.dto";

@Controller('deck')
export class DeckController {

    constructor(private deckService: DeckService) {
    }

    @Post('create')
    public createDeck(@Body() createDeckDto: CreateDeckRequestDto) {
        return this.deckService.createDeck(createDeckDto);
    }

    @Get(':uuid')
    public getDeck(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.deckService.findDeck(uuid);
    }

    @Get(':uuid/draw')
    public drawACard(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Query('draw', ParseIntPipe) draw: number) {
        return this.deckService.drawACard(uuid, draw);
    }

}
