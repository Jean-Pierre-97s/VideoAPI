import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateVideoDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsOptional()
    description: string | null;

    @IsNotEmpty()
    @Min(1)
    @IsInt()
    category_id: number
}
