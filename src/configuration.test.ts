import configuration from './configuration';
import SimpleEvent from './utils/simpleEvent';

const communicator = () => ({
  send: jest.fn().mockImplementation((message) => {
    if (message.data.keys.includes('VALID')) {
      return {
        'VALID': { value: 'value' }
      }
    } else if (message.data.keys.includes('SECOND')) {
      return {
        'SECOND': { value: 'second' }
      }
    }
  }),
  messageReceived: new SimpleEvent<any>()
});

describe('The configuration function', () => {
  it('Should return values for requested keys', async () => {
    const conf = await configuration(communicator())('VALID');
    expect(conf).toHaveProperty('VALID');
    expect(conf['VALID']).toBe('value');
  });

  it('Should return undefined for missing values', async () => {
    const conf = await configuration(communicator())('MISSING');
    expect(conf['MISSING']).toBeUndefined();
  });

  it('Should return the cached version of a value', async () => {
    const comm = communicator();
    const conf = configuration(comm);
    await conf('SECOND');
    await conf('SECOND');
    await conf('SECOND');
    expect(comm.send).toHaveBeenCalledTimes(1);
  });
});
