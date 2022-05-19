import {IsBoolean, IsIn, IsNotEmpty, IsString} from "class-validator";
import {DeckTypeEnum} from "../enum/deck-type.enum";

export class CreateDeckRequestDto {
    @IsString()
    @IsNotEmpty()
    @IsIn([DeckTypeEnum.FULL, DeckTypeEnum.SHORT])
    type: string;

    @IsBoolean()
    @IsNotEmpty()
    shuffled: boolean;
}
