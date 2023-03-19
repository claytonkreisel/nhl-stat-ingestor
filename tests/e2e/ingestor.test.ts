import { ingestorHandler } from '../../src/functions/ingestor';
import * as retry from 'async-retry';

describe('Successful fetches', () => {
  it('Call ingestor with good data', async () => {
    const ingestor = ingestorHandler(2021021036);
    expect(ingestor.gameId).toStrictEqual(2021021036);
    expect(ingestor.message).toContain('invoked');
    await retry(async () => {}, {
      retries: 10,
      factor: 1,
      minTimeout: 1000,
      maxTimeout: 1500,
    });
  });
});

describe('Unsuccessful fetches', () => {
  it('Call ingestor with bad data', async () => {
    const ingestor = ingestorHandler(-1);
    expect(ingestor.message).toContain('invoked');
    await retry(async () => {}, {
      retries: 15,
      factor: 1,
      minTimeout: 1000,
    });
  });
});
