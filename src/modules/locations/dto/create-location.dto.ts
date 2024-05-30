import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateLocationDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    building: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    parent_location: string[]

    @IsNumber()
    @IsOptional()
    parent_id: number

    @IsArray()
    @IsNumber({ allowNaN: false }, { each: true })
    @IsOptional()
    coordinates: number[]

    @IsNumber()
    @IsNotEmpty()
    area: number
}

