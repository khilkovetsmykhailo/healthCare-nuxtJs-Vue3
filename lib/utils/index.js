import delay              from './delay';
import handleAxiosError   from './handleAxiosError';
import * as pagination    from './pagination';
import sluggify           from './sluggify';
import unsluggify         from './unsluggify';
import getDatesRangeArray from './getDateRangeArray'

const pg = pagination;

export {
  delay,
  handleAxiosError,
  pagination,
  pg,
  sluggify,
  unsluggify,
  getDatesRangeArray,
};
