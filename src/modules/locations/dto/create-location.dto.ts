import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateLocationDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @ApiProperty({ example: 'A' })
    building: string

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @ApiProperty({ example: 'Car Park' })
    name: string

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @ApiProperty({ example: ["A", "CarPark"] })
    parent_location: string[]

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 1 })
    parent_id: number

    @IsArray()
    @IsNumber({ allowNaN: false }, { each: true })
    @IsOptional()
    @ApiProperty({ example: [ 40.741895, -73.98930777777778 ] })
    coordinates: number[]

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 80620 })
    area: number

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 1 })
    level: number
}

