export const get = (...keys: string[]) => ({
  domain: 'config',
  eventType: 'get',
  data: {
    keys,
  },
});
