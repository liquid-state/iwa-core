const IWA_DOMAIN = 'iwa';

const NAVIGATE_EVENT = 'navigate';
const BACK_EVENT = 'navigate_back';

export type NavigateOptions = {
  app?: string;
  tab?: string;
  replace?: boolean;
  additionalData?: object;
};

/** Trigger a native navigation to a new route.
 * @param route The route to navigate to
 * @param options Navigation options
 */
export const navigate = (route: string, options: NavigateOptions = {}) => {
  if (options.tab && !options.app) {
    throw new Error(
      'Invalid navigation. The target webapp must be provided when navigating across tabs'
    );
  }
  return {
    domain: IWA_DOMAIN,
    eventType: NAVIGATE_EVENT,
    data: {
      route,
      webapp_id: options.app,
      tab_id: options.tab,
      transition: options.replace ? 'replace' : 'push',
      ...(options.additionalData || {}),
    },
  };
};

/** Navigate back one route, or until a specific route is found in the back stack
 * @param route_id The id of a route to find in the back stack
 * @param app The id of a webapp to find route_id in.
 *
 * @description
 * If this is called with no options the native app will navigate back one step.
 *
 * If a route_id is provided the native app will attempt to find a matching route
 * from the webapp.json of the current webapp or of the webapp with id specified
 * in the app parameter.
 */
export const navigateBack = (route_id?: string, app?: string) => ({
  domain: IWA_DOMAIN,
  eventType: BACK_EVENT,
  data: {
    route_id: route_id,
    webapp_id: app,
  },
});

export const setReady = () => ({
  domain: 'iwa',
  eventType: 'set_ready',
  data: {},
});
