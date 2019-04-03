import { resolveSettings, Setting } from "./pluginHelpers";

const app = {
  configuration: () => ({
    TEST: 'a',
    TEST2: 'b',
  }),
};


describe('The resolveSettings function', () => {
  it('Should return an empty object when passed an empty object', async () => {
    const result = await resolveSettings(app as any, {});
    expect(result).toMatchObject({});
  });

  it('Should return config options which are not settings', async () => {
    const result = await resolveSettings(app as any, { test: 'hello' });
    expect(result).toMatchObject({ test: 'hello' });
  });

  it('Should return the config value for a setting', async () => {
    const result = await resolveSettings(app as any, { test: Setting('TEST') });
    expect(result).toMatchObject({ test: 'a' });
  });

  it('Should return the combination of plain settings, and config settings', async () => {
    const result = await resolveSettings(app as any, {
      test1: 'test',
      test2: Setting('TEST')
    });
    expect(result).toMatchObject({ test1: 'test', test2: 'a' });
  });

  it('Should return undefined for missing settings', async () => {
    const result = await resolveSettings(app as any, { missing: Setting('missing') });
    expect(result.missing).toBeUndefined();
  });

  it('Should return the default value for missing settings', async () => {
    const result = await resolveSettings(app as any, { missing: Setting('missing', 'default') });
    expect(result.missing).toBe('default');
  });
});
