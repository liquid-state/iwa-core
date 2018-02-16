import Parser from './parse';

describe('Webapp Definition Parser', () => {
  it('parses an empty definition', () => {
    const result = new Parser().parse('{}');
    expect(result).toBeDefined();
  });

  it('parses an definition with empty but present routes and actions', () => {
    const result = new Parser().parse(JSON.stringify({ routes: {}, actions: {} }));
    expect(result).toBeDefined();
    expect(result.routes).toBeDefined();
    expect(result.actions).toBeDefined();
  });

  it('parses an action', () => {
    const raw = JSON.stringify({
      actions: {
        definitions: {
          edit: {
            domain: 'iwa',
            event_type: 'navigate',
            params: {
              example: 'data',
            },
          },
        },
        presentations: {
          edit: {
            action_id: 'edit',
            icon: 'pencil',
            title: {
              key: 'hello',
              translations: {
                en: 'Hello',
                es: 'Hola',
              },
            },
          },
        },
      },
    });

    const expected = {
      id: 'edit',
      icon: 'pencil',
      title: {
        key: 'hello',
        translations: {
          en: 'Hello',
          es: 'Hola',
        },
      },
      action: {
        domain: 'iwa',
        eventType: 'navigate',
        params: {
          example: 'data',
        },
      },
    };

    const result = new Parser().parse(raw);
    expect(result.actions.get('edit')).toBeDefined();
    expect(result.actions.get('edit')).toMatchObject(expected);
  });

  it('parses an empty route', () => {
    const raw = JSON.stringify({
      routes: {
        '/edit': {},
      },
    });

    const expected = {
      path: '/edit',
      actions: {
        primary: [],
        secondary: [],
      },
    };

    const result = new Parser().parse(raw);
    expect(result.routes.get('/edit')).toMatchObject(expected);
  });

  it('parses a route with an id', () => {
    const raw = JSON.stringify({
      routes: {
        '/edit': {
          route_id: 'hello',
        },
      },
    });

    const expected = {
      id: 'hello',
      path: '/edit',
      actions: {
        primary: [],
        secondary: [],
      },
    };

    expect(new Parser().parse(raw).routes.get('/edit')).toMatchObject(expected);
  });

  it('parses a route with actions', () => {
    const raw = JSON.stringify({
      routes: {
        '/edit': {
          actions: {
            primary: ['edit-btn'],
            secondary: ['add-btn'],
          },
        },
      },
    });

    const expected = {
      path: '/edit',
      actions: {
        primary: ['edit-btn'],
        secondary: ['add-btn'],
      },
    };

    expect(new Parser().parse(raw).routes.get('/edit')).toMatchObject(expected);
  });

  it('Finds a route by id', () => {
    const raw = JSON.stringify({
      routes: {
        '/edit': {
          route_id: 'hello',
        },
      },
    });

    const result = new Parser().parse(raw).routeWithId('hello');
    expect(result).toBeDefined();
    expect(result!.id).toEqual('hello');
  });

  it('Returns undefined from routeById for route ids which do not exist', () => {
    const raw = JSON.stringify({ routes: {} });
    const result = new Parser().parse(raw).routeWithId('hello');

    expect(result).not.toBeDefined();
  });
});
