import { Transform, TransformFnParams } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  term?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform((params) => parseInt(params.value, 10))
  page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform((params) => parseInt(params.value, 10))
  limit?: number;
}
