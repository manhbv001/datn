// default unit is thoudsand (1000)
export const roundByUnit = (v: number, unitLevel = 1000) => {
  return Math.round(v / unitLevel) * unitLevel;
};

export function isNumeric(str: string | number) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export const formatPhoneNumber = (phone: string | number) => {
  phone = phone.toString().replace(/ /g, '');
  if (phone[0] == '0') return phone;
  if (phone.slice(0, 3) == '+84') return '0' + phone.slice(3);
  if (phone.slice(0, 3) == '844') return '0' + phone.slice(3);
  else return '0' + phone;
};
