export const toQueryParams = (params: Record<string, any>) => {
  let query = '?';
  Object.entries(params).forEach(([key, value]) => {
    if (value) query += `${key}=${value}&`;
  });

  return query;
};
