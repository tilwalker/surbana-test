import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator"

export class FilterDto {
    @IsString()
    @IsOptional()
    building: string

    @IsString()
    @IsOptional()
    text: string

    @IsArray()
    @IsString({ each: true })
    parent_location: string[]
}

export class Paging {
    @IsNumber()
    @IsOptional()
    limit: number

    @IsNumber()
    @IsOptional()
    skip: number

    @IsObject()
    @IsOptional()
    sort: {
        [key: string]: 'DESC' | 'ASC'
    }
}

export class FilterLocationDto {
    @IsOptional()
    @ValidateNested({ each: true })
    filter: FilterDto

    @IsOptional()
    @ValidateNested({ each: true })
    paging: Paging
}

