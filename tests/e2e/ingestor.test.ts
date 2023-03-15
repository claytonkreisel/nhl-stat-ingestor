import { ingestorHandler } from '../../src/functions/ingestor';

describe('Successful fetches', () => {
  it('Call ingestor with good data', async () => {
    const ingestor = ingestorHandler(2021021036);
    expect(ingestor.gameId).toStrictEqual(2021021036);
    expect(ingestor.message).toContain('invoked');
  });
});

describe('Unsuccessful fetches', () => {
  it('Call ingestor with bad data', async () => {
    const ingestor = ingestorHandler(-1);
    expect(ingestor.message).toContain('invoked');
  });
});
