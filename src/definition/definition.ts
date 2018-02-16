import { IDefinition, ActionId, Action, Path, Route } from './types';

export default class Definition implements IDefinition {
  constructor(
    public id: string,
    public defaultLocale: string,
    public actions: Map<ActionId, Action>,
    public routes: Map<Path, Route>
  ) {}

  routeWithId(id: string): Route | undefined {
    return Array.from(this.routes.values()).find(route => route.id === id);
  }
}
