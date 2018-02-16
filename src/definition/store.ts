import { IDefinition } from './types';
import DefinitionParser from './parse';

export default class DefinitionStore {
  private _store = new Map<string, IDefinition>();
  private parser = new DefinitionParser();

  store(raw: string | object): IDefinition {
    const result = this.parser.parse(raw);
    this._store.set(result.id, result);
    return result;
  }

  fetch(id: string): IDefinition {
    const result = this._store.get(id);
    if (!result) {
      throw `Trying to fetch webapp definition for id ${id}, which is not loaded.`;
    }
    return result;
  }

  all(): IDefinition[] {
    return Array.from(this._store.values());
  }
}
