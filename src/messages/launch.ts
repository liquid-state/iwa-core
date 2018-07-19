export const documentLibrary = (category?: string) => ({
  domain: 'launch',
  eventType: 'document_library',
  data: {
    category,
  },
});
