export type ActionId = string;
export type Path = string;

export interface IDefinition {
  id: string;
  defaultLocale: string;
  actions: Map<ActionId, Action>;
  routes: Map<Path, Route>;

  routeWithId(id: string): Route | undefined;
}

export interface Action {
  id: ActionId;
  icon: string;
  title:
    | string
    | {
        key: string;
        translations: {
          [key: string]: string;
        };
      };
  action: {
    domain: string;
    eventType: string;
    params: {
      [key: string]: string;
    };
  };
}

export interface Route {
  id?: string;
  path: string;
  actions: {
    primary: ActionId[];
    secondary: ActionId[];
  };
}
