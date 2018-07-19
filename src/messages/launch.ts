export const documentLibrary = (category?: string) => ({
  domain: 'config',
  eventType: 'get',
  data: {
    category,
  },
});
