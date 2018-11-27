const APP_DOMAIN = 'app';
const SET_BACK_OVERRIDE = 'set_back_override';

export const reset = () => ({
  domain: 'app',
  eventType: 'reset',
  data: {},
});

export const setAuthenticationStatus = (isAuthenticated: boolean) => ({
  domain: 'app',
  eventType: 'set_authentication_status',
  data: {
    is_authenticated: isAuthenticated,
  },
});

export const setBackOverride = (enabled: boolean) => ({
  domain: APP_DOMAIN,
  eventType: SET_BACK_OVERRIDE,
  data: {
    is_enabled: enabled,
  },
});
