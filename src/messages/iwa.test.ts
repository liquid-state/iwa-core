import { navigate, navigateBack } from './iwa';

describe('iwa domain messages', () => {
  describe('navigate', () => {
    it('Should set the correct domain and eventType', () => {
      const message = navigate('/');
      expect(message.domain).toBe('iwa');
      expect(message.eventType).toBe('navigate');
    });

    it('Should include the route', () => {
      const message = navigate('/');
      expect(message.data.route).toBe('/');
    });

    it('Should have the correct defaults', () => {
      const message = navigate('/');
      const example = {
        route: '/',
        webapp_id: undefined,
        tab_id: undefined,
        transition: 'push',
      };
      expect(message.data).toMatchObject(example);
    });

    it('Accepts a replace option to change the transition', () => {
      const message = navigate('/', { replace: true });
      expect(message.data.transition).toBe('replace');
    });

    it('Accepts an app option and sets webapp_id', () => {
      const message = navigate('/', { app: 'home' });
      expect(message.data.webapp_id).toBe('home');
    });

    it('Accepts a tab and app together for cross tab navigation', () => {
      const message = navigate('/', { app: 'home', tab: 'menu' });
      expect(message.data.webapp_id).toBe('home');
      expect(message.data.tab_id).toBe('menu');
    });

    it('Throws if tab is provided without the app option', () => {
      expect(() => navigate('/', { tab: 'menu' })).toThrowError(
        'Invalid navigation. The target webapp must be provided when navigating across tabs'
      );
    });

    it('Merges additional options from additionalData', () => {
      const message = navigate('/', { additionalData: { context: { hello: 'world' } } });
      expect((message.data as any).context).toBeDefined();
      expect((message.data as any).context.hello).toBe('world');
    });
  });

  describe('navigateBack', () => {
    it('Should have the correct domain and eventType', () => {
      const message = navigateBack();
      expect(message.domain).toBe('iwa');
      expect(message.eventType).toBe('navigate_back');
    });

    it('Should have the correct defaults', () => {
      const defaultData = {
        route_id: undefined,
        webapp_id: undefined,
      };
      expect(navigateBack().data).toMatchObject(defaultData);
    });

    it('Should accept a route_id', () => {
      expect(navigateBack('home').data.route_id).toBe('home');
    });

    it('Should accept an app as well as route id', () => {
      expect(navigateBack('home', 'login').data.webapp_id).toBe('login');
    });
  });
});
