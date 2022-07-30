import { DataManager } from '../../../interfaces/data.manager';

export interface IUsersDataManager extends DataManager {
  findByLogin(login: string);
  findSuggested(limit: number, include: string);
}
