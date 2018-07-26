import { documentLibrary, document } from './launch';

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
});
