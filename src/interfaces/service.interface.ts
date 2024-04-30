export interface IService {
  getAll(): Promise<any>;
  getById(id: number): Promise<any>;
  create(dto: any): Promise<any>;
  updateById(id: number, dto: any): Promise<any>;
  deleteById(id: string): Promise<any>;
}
