import Definition from './definition';
import { IDefinition, Action, Route } from './types';
import { mapValues, reduce, pick, flow, identity } from 'lodash';

export type ActionId = string;
export type PresentationId = string;

export interface IRawDefinition {
  id: string;
  default_locale: string;
  actions?: ActionsDefinitions;
  routes?: RouteDefinitions;
}

export interface ActionsDefinitions {
  definitions: {
    [id: string]: ActionDefinition;
  };
  presentations: {
    [key: string]: ActionPresentation;
  };
}

export interface ActionDefinition {
  domain: string;
  event_type: string;
  params?: {
    [key: string]: any;
  };
}

export interface ActionPresentation {
  action_id: ActionId;
  icon: string;
  title:
    | string
    | {
        key: string;
        translations: { [key: string]: string };
      };
}

export interface RouteDefinitions {
  [key: string]: RouteDefinition;
}

export interface RouteDefinition {
  route_id?: string;
  actions?: {
    primary?: PresentationId[];
    secondary?: PresentationId[];
  };
}

export default class DefinitionParser {
  parse(raw: string | object): IDefinition {
    const definition = (typeof raw === 'string' ? JSON.parse(raw) : raw) as IRawDefinition;

    return new Definition(
      definition.id,
      definition.default_locale,
      this.mapActions(definition),
      this.mapRoutes(definition)
    );
  }

  private mapActions(definition: IRawDefinition): Map<string, Action> {
    const presentations = definition.actions ? definition.actions.presentations : {};
    const definitions = definition.actions ? definition.actions.definitions : {};

    return flow(
      (data: any) =>
        mapValues(data, (value, key) => {
          if( typeof value.action_id === 'undefined') 
            throw new Error(`Field "action_id" is missing from presentation "${key}"`);
          const definition = definitions[value.action_id];
          if( typeof definition === 'undefined') 
            throw new Error(`Action "${value.action_id}" is missing from presentation "${key}"`);
          return {
            id: key,
            action: {
              ...pick(definition, ['domain', 'params']),
              eventType: definition.event_type,
            },
            ...value,
          };
        }),
      data =>
        reduce(
          data,
          (result, value, key) => {
            result.set(key, value);
            return result;
          },
          new Map()
        )
    )(presentations);
  }

  private mapRoutes(definition: IRawDefinition): Map<string, Route> {
    const routes = definition.routes ? definition.routes : {};
    return flow(
      (data: any) =>
        mapValues(data, (value, key) => {
          return {
            id: value.route_id,
            path: key,
            actions: {
              primary: (value.actions && value.actions.primary) || [],
              secondary: (value.actions && value.actions.secondary) || [],
            },
          };
        }),
      data =>
        reduce(
          data,
          (result, value, key) => {
            result.set(key, value);
            return result;
          },
          new Map()
        )
    )(routes);
  }
}
