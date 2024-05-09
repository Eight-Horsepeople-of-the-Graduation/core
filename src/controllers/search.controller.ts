import { Request, Response } from "express";
import searchService from "../services/search.service";
import { plainToClass } from "class-transformer";
import { SearchQueryDto } from "../dtos/search.dto";

export const search = async (req: Request, res: Response) => {
  const query = plainToClass(SearchQueryDto, req.query);

  const result = await searchService.search(query);

  return res.send(result);
};

export default {
  search,
};
