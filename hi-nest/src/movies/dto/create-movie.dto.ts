import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto{
    @IsString() //class의 유효성 검사
    readonly title : string;
    @IsNumber()
    readonly year : number;

    @IsOptional()
    @IsString({each : true})
    readonly genres : string[];
}