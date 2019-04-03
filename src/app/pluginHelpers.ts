import { pickBy, reduce } from 'lodash';
import { IApp } from "./app";

export const SETTING = Symbol("SETTING");

type SettingT = {
  tag: Symbol,
  name: string,
  defaultValue: any,
};

export const Setting = (name: string, defaultValue?: any): SettingT => ({
  tag: SETTING,
  name,
  defaultValue,
});

export const resolveSettings = async (app: IApp, config: { [i: string]: any }) => {
  const toResolve = pickBy(config, value => value.tag === SETTING);
  const results = await app.configuration(...Object.values(toResolve).map(o => o.name))
  const resolved = reduce(toResolve, (result, value, key) => {
    const resolvedValue = results[value.name];
    result[key] = resolvedValue ? resolvedValue : value.defaultValue;
    return result;
  }, {} as { [i: string]: any});
  return {
    ...config,
    ...resolved
  };
}
