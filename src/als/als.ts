import DataFactory from './data';

export type IALSProvider = {
  result(): Promise<IALS>;
};

export type IALS = {
  getUrl(service: string, url: string): string;
};

export type ALSData = {
  services: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

export class ALS implements IALS {
  constructor(private data: ALSData) {}

  getUrl(service: string, url: string): string {
    try {
      return this.data.services[service][url];
    } catch (e) {
      throw `Unknown als entry ${service} ${url}`;
    }
  }
}

/*
ALS Provider which defers the retrieval of the als until it is acutally needed.

This resolves the dependency cycle between ALS and User Information Service.
That is the User Information Service needs the ALS to find its own addresses,
however other services require the ALS provided by accessing the UIS to get their addresses.

This provider model allows the UIS to get the native during initial setup but always returns the
real ALS afterwards. This also allows the UIS to switch between authenticated and unauthenticated
ALS as appropriate at the time the als is needed.
*/
export default class ALSProvider implements IALSProvider {
  constructor(private dataProvider: DataFactory<ALSData>) {}

  async result(): Promise<IALS> {
    // We get this freshly everytime the als is requested so that if
    // it changes we always get the correct data.
    let data = await this.dataProvider.result();
    return new ALS(data);
  }
}
