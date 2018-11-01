const LAUNCH_DOMAIN = 'launch';

const DOCUMENT_LIBRARY_EVENT = 'document_library';
const DOCUMENT_EVENT = 'document';
const BROWSER_EVENT = 'iab';

export const documentLibrary = (category?: string) => ({
  domain: LAUNCH_DOMAIN,
  eventType: DOCUMENT_LIBRARY_EVENT,
  data: {
    category,
  },
});

export const document = (documentId: string, pageSlug?: string) => ({
  domain: LAUNCH_DOMAIN,
  eventType: DOCUMENT_EVENT,
  data: {
    product_id: documentId,
    page_slug: pageSlug,
  },
});

/** Opens the provided url in a web browser
 *
 * @param url The url to open
 * @param external
 * Whether to open the url in a webview inside the app, or in the external system browser
 */
export const browser = (url: string, external = false) => ({
  domain: LAUNCH_DOMAIN,
  eventType: BROWSER_EVENT,
  data: {
    url,
    settings: {
      external,
    },
  },
});
