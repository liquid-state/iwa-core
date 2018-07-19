import { documentLibrary } from './launch';

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
});
