export const get = (keys: Array<string>) => ({
  domain: 'kv',
  eventType: 'get',
  data: {
    keys
  }
});

export interface SettableKey {
  key: string,
  value: string | null,
  permissions: object | undefined
}

export const set = (keys: Array<SettableKey>) =>({
  domain: 'kv',
  eventType: 'set',
  data: {
    items: keys
  }
});