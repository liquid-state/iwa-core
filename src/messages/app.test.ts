import { setBackOverride } from './app';

describe('App domain events', () => {
  describe('setBackOverride', () => {
    it('Has the correct domain and eventType', () => {
      expect(setBackOverride(false)).toMatchObject({
        domain: 'app',
        eventType: 'set_back_override',
      });
    });

    it('Sets enabled correctly', () => {
      expect(setBackOverride(false).data.enabled).toBeFalsy();
      expect(setBackOverride(true).data.enabled).toBeTruthy();
    });
  });
});
