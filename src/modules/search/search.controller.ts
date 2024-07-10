import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import searchService from "@modules/search/search.service";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";

export const search = async (req: Request, res: Response) => {
  const query = plainToClass(SearchQueryDto, req.query);

  const result = await searchService.search(query);

  return res.send(result);
};

export default {
  search,
};
