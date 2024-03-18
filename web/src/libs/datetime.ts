const dayjs = require('dayjs');
require('dayjs/locale/vi');

const formattedDate = (string: string) => {
  return dayjs(string).locale('vi').format('DD/MM/YYYY HH:mm:ss');
};

const datetime = {
  formattedDate,
};

export default datetime;
