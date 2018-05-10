import { get } from './config';

describe('Config domain messages', () => {
  describe('Get', () => {
    it('Sets the correct domain and event type', () => {
      const message = get('test');
      expect(message.domain).toBe('config');
      expect(message.eventType).toBe('get');
    });

    it('Contains the provided keys', () => {
      const message = get('test', 'foo', 'bar');
      expect(message.data.keys).toContain('test');
      expect(message.data.keys).toContain('foo');
      expect(message.data.keys).toContain('bar');
      expect(message.data.keys).toHaveLength(3);
    });
  });
});
