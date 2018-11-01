export const reset = () => ({
  domain: 'app',
  eventType: 'reset',
  data: {},
});

export const setAuthenticationStatus = (isAuthenticated: Boolean) => ({
  domain: 'app',
  eventType: 'set_authentication_status',
  data: {
    is_authenticated: isAuthenticated,
  },
});
