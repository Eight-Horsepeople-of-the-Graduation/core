import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class SearchQueryDto {
  @IsString()
  term: string;

  @IsOptional()
  @IsString({ each: true })
  fields?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
