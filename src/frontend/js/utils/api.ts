import axios, { AxiosPromise } from 'axios';
import { CONFIG } from "../constants/config";

type Props = {
  filter: {
    [key: string]: any,
  },
  sortBy: string,
  sortOrder: string,
  offset: number,
  count: number,
}

export const fetchUsers = ({
  filter,
  sortBy = '',
  sortOrder = '',
  offset = 0,
  count = 15,
}: Props): AxiosPromise => axios.get(
  CONFIG.API_URL,
  {
    params: {
      ...filter,
      sortBy,
      sortOrder,
      offset,
      count,
    }
  }
).then(data => data.data);
