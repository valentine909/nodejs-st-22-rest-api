export interface DataManager {
  create(createDto: any);

  findById(id: string);

  findAll?();

  update(id: string, updateDto: any);

  delete(id: string);
}
