import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string | null
}
