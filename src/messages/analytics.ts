export const ANALYTICS_DOMAIN = 'analytics';
export const SET_ANALYTICS_ENABLED = 'set_analytics_enabled';
export const SET_SUPER_PROPERTIES = 'set_super_properties';
export const ADD_SUPER_PROPERTIES = 'add_super_properties';
export const REMOVE_SUPER_PROPERTIES = 'remove_super_properties';
export const POST = 'post';

interface Message<T> {
  domain: typeof ANALYTICS_DOMAIN;
  eventType:
    | typeof SET_ANALYTICS_ENABLED
    | typeof SET_SUPER_PROPERTIES
    | typeof ADD_SUPER_PROPERTIES
    | typeof REMOVE_SUPER_PROPERTIES
    | typeof POST;
  data: T;
}
type Properties = {
  [key: string]: string | boolean | number;
};

export const setAnalyticsEnabled = (
  userId: string,
  isEnabled: boolean,
): Message<{ user_id: string; is_enabled: boolean }> => ({
  domain: ANALYTICS_DOMAIN,
  eventType: SET_ANALYTICS_ENABLED,
  data: {
    is_enabled: isEnabled,
    user_id: userId,
  },
});

export const setSuperProperties = (
  properties: Properties,
): Message<{ properties: Properties }> => ({
  domain: ANALYTICS_DOMAIN,
  eventType: SET_SUPER_PROPERTIES,
  data: {
    properties,
  },
});

export const addSuperProperties = (
  properties: Properties,
): Message<{ properties: Properties }> => ({
  domain: ANALYTICS_DOMAIN,
  eventType: ADD_SUPER_PROPERTIES,
  data: {
    properties,
  },
});

export const removeSuperProperties = (
  properties: Properties,
): Message<{ properties: Properties }> => ({
  domain: ANALYTICS_DOMAIN,
  eventType: REMOVE_SUPER_PROPERTIES,
  data: {
    properties,
  },
});

export const post = (
  name: string,
  properties: Properties,
): Message<{ name: string; properties: Properties }> => ({
  domain: ANALYTICS_DOMAIN,
  eventType: POST,
  data: {
    name,
    properties,
  },
});
