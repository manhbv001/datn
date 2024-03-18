/**
 * Định dạng số với đơn vị viết tắt. ex: 1k, 1M, 1.5M
 *
 * @param {number} num - Số cần định dạng
 * @param {number} digits - Phần thập phân sau dấu chấm, mặc định là 1
 * @return {*}
 */
export function formatNumberWithUnit(num: number, digits: number = 1): string {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: ' nghìn' },
    { value: 1e6, symbol: ' triệu' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
}
