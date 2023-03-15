import {
  checkGameId,
  fetchNhlLiveFeed,
  parseGameDataFromNhlLiveFeedData,
} from '../../src/functions/ingestor';
import { IngestorGameDataGameStatus } from '../../src/functions/ingestor/types';
import {
  completedGameLiveFeedRequest,
  inProgressGameLiveFeedRequest,
} from './mocks/live-feed-data';
describe('Test checkGameId()', () => {
  it('Test for an integer that is too low passed as gameId', () => {
    expect(checkGameId(2016999999)).toStrictEqual(
      Error('gameId must be a number between 2017000000 and 3000000000')
    );
  });
  it('Test for an integer that is too high passed as gameId', () => {
    expect(checkGameId(3000000001)).toStrictEqual(
      Error('gameId must be a number between 2017000000 and 3000000000')
    );
  });
  it('Test for float passed as gameId', () => {
    expect(checkGameId(2.11)).toStrictEqual(Error('gameId must be integer'));
  });
});

describe('Test fetchNhlLiveFeed()', () => {
  it('Test data from game id', async () => {
    const nhlLiveFeedData = await fetchNhlLiveFeed(2021021036);
    expect(nhlLiveFeedData).not.toBe(Error);
    expect(nhlLiveFeedData).toHaveProperty('gameData');
    expect(nhlLiveFeedData).toMatchSnapshot();
  });
  it('Test data from non-game id', async () => {
    const nhlLiveFeedData = await fetchNhlLiveFeed(20210210326);
    expect(nhlLiveFeedData).toStrictEqual(
      Error("Could not get data for gameId '20210210326'")
    );
  });
});

describe('Test parseGameDataFromNhlLiveFeedData()', () => {
  it('Test parsing a completed game', async () => {
    const parsedData = parseGameDataFromNhlLiveFeedData(
      completedGameLiveFeedRequest
    );
    expect(parsedData).toHaveProperty('gameId', 2021021036);
    expect(parsedData).toHaveProperty(
      'gameStatus',
      IngestorGameDataGameStatus.COMPLETE
    );
    expect(parsedData).toHaveProperty('teamStats');
    expect(parsedData).toHaveProperty('playerStats');
    expect(parsedData.teamStats.length).toBe(2);
    expect(parsedData.playerStats.length).toBe(45);
    expect(parsedData.playerStats[0]).toHaveProperty('assists', 0);
    expect(parsedData.playerStats[0]).toHaveProperty('goals', 0);
    expect(parsedData.playerStats[0]).toHaveProperty('hits', 1);
    expect(parsedData.playerStats[0]).toHaveProperty('penaltyMinutes', 0);
    expect(parsedData.playerStats[0]).toHaveProperty('points', 0);
    expect(parsedData.playerStats[0]).toHaveProperty(
      'opponentName',
      'Florida Panthers'
    );
    expect(parsedData.playerStats[0]).toHaveProperty('opponentId', 13);
    expect(parsedData.playerStats[7]).toHaveProperty('points', 1);
    expect(parsedData.playerStats[7]).toHaveProperty('goals', 1);
    expect(parsedData.playerStats[7]).toHaveProperty('assists', 0);
    expect(parsedData).toMatchSnapshot();
  });
});

describe('Test parseGameDataFromNhlLiveFeedData()', () => {
  it('Test parsing a live game', async () => {
    const parsedData = parseGameDataFromNhlLiveFeedData(
      inProgressGameLiveFeedRequest
    );
    expect(parsedData).toHaveProperty('gameId', 2022021049);
    expect(parsedData).toHaveProperty(
      'gameStatus',
      IngestorGameDataGameStatus.LIVE
    );
    expect(parsedData).toHaveProperty('teamStats');
    expect(parsedData).toHaveProperty('playerStats');
    expect(parsedData.teamStats.length).toBe(2);
    expect(parsedData.playerStats.length).toBe(46);
    expect(parsedData).toMatchSnapshot();
  });
});
