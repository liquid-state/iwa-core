export const documentLibrary = (category?: string) => ({
  domain: 'launch',
  eventType: 'document-library',
  data: {
    category,
  },
});
