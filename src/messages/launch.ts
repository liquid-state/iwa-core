export const documentLibrary = (category?: string) => ({
  domain: 'launch',
  eventType: 'document_library',
  data: {
    category,
  },
});

export const document = (documentId: string, pageSlug?: string) => ({
  domain: 'launch',
  eventType: 'document',
  data: {
    product_id: documentId,
    page_slug: pageSlug,
  },
});
