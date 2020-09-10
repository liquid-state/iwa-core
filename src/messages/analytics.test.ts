import {
  setAnalyticsEnabled,
  setSuperProperties,
  addSuperProperties,
  removeSuperProperties,
  post,
} from './analytics';

describe('Analytics domain', () => {
  describe('setAnalyticsEnabled', () => {
    const userId = '81a91de7-e543-4dfc-b2cb-0630232901b0';
    it('Should have the correct domain, eventType and data', () => {
      expect(setAnalyticsEnabled(userId, true)).toMatchObject({
        domain: 'analytics',
        eventType: 'set_analytics_enabled',
        data: { is_enabled: true, user_id: userId },
      });
    });
  });

  describe('setSuperProperties', () => {
    const properties = { prop1: true, prop2: 'test', prop3: 42 };
    it('Should have the correct domain, eventType and data', () => {
      expect(setSuperProperties(properties)).toMatchObject({
        domain: 'analytics',
        eventType: 'set_super_properties',
        data: { properties },
      });
    });
  });

  describe('addSuperProperties', () => {
    const properties = { prop1: true, prop2: 'test', prop3: 42 };
    it('Should have the correct domain, eventType and data', () => {
      expect(addSuperProperties(properties)).toMatchObject({
        domain: 'analytics',
        eventType: 'add_super_properties',
        data: { properties },
      });
    });
  });

  describe('removeSuperProperties', () => {
    const properties = { prop1: true, prop2: 'test', prop3: 42 };
    it('Should have the correct domain, eventType and data', () => {
      expect(removeSuperProperties(properties)).toMatchObject({
        domain: 'analytics',
        eventType: 'remove_super_properties',
        data: { properties },
      });
    });
  });

  describe('post', () => {
    const name = 'name';
    const properties = { prop1: true, prop2: 'test', prop3: 42 };
    it('Should have the correct domain, eventType and data', () => {
      expect(post(name, properties)).toMatchObject({
        domain: 'analytics',
        eventType: 'post',
        data: { name, properties },
      });
    });
  });
});
