import { documentLibrary, document, browser } from './launch';

describe('Launch domain messages', () => {
  describe('Document Library', () => {
    it('Sets the correct domain and event type', () => {
      const message = documentLibrary();
      expect(message.domain).toBe('launch');
      expect(message.eventType).toBe('document_library');
      expect(message.data.category).toBeUndefined();
    });

    it('Contains the provided category', () => {
      const message = documentLibrary('category-1');
      expect(message.data.category).toBe('category-1');
    });
  });
  describe('Document', () => {
    it('Sets the correct domain and event type', () => {
      const message = document('com.example.my-product');
      expect(message.domain).toBe('launch');
      expect(message.eventType).toBe('document');
      expect(message.data.product_id).toBe('com.example.my-product');
      expect(message.data.page_slug).toBeUndefined();
    });

    it('Contains the provided request parameters', () => {
      const message = document('com.example.my-product', 'my-page-slug');
      expect(message.data.product_id).toBe('com.example.my-product');
      expect(message.data.page_slug).toBe('my-page-slug');
    });
  });

  describe('Browser', () => {
    it('Sets the correct domain and event type', () => {
      const message = browser('https://example.com');
      expect(message.domain).toBe('launch');
      expect(message.eventType).toBe('iab');
      expect(message.data.url).toBe('https://example.com');
    });

    it('Sets external false by default', () => {
      const message = browser('https://example.com');
      expect(message.data.settings.launch_type).toBe('default');
    });

    it('Sets external true when set', () => {
      const message = browser('https://example.com', true);
      expect(message.data.settings.launch_type).toBeDefined();
      expect(message.data.settings.launch_type).toBe('external');
    });
  });
});
