import axios, { AxiosResponse } from 'axios';
import { NhlApiBaseUrl } from '../../common';
import {
  IngestorProcessResponse,
  IngestorProcessStage,
  IngestorProcessStatus,
  IngestorProcessError,
  // IngestorProcessProgress,
  IngestorHandlerReturn,
  IngestorGameData,
  IngestorGameDataPlayerStats,
  IngestorGameDataTeamStats,
  NhlApiLiveFeedRequest,
  IngestorGameDataGameStatus,
  IngestorStoreDataResult,
} from './types';
import { v4 as uuidv4 } from 'uuid';

/*
 * This would be converted in to a lamdba function most likely later on and setup using
 * api gateway. In order to simulate this sort of setup we are simply using an exported
 * function that is invoked when needed. That function is named ingestorMain()
 */

export const checkGameId = (gameId: number): true | Error => {
  if (!Number.isInteger(gameId)) return new Error('gameId must be integer');
  if (gameId < 2017000000 || gameId > 3000000000)
    return new Error(
      'gameId must be a number between 2017000000 and 3000000000'
    );
  return true;
};

export const fetchNhlLiveFeed = async (
  gameId: number
): Promise<NhlApiLiveFeedRequest | Error> => {
  try {
    const gameRequest: AxiosResponse<NhlApiLiveFeedRequest> = await axios.get(
      `${NhlApiBaseUrl}/game/${gameId}/feed/live`
    );
    return gameRequest.data;
  } catch (e) {
    return Error(`Could not get data for gameId '${gameId}'`);
  }
};

export const parseGameDataFromNhlLiveFeedData = (
  nhlLiveFeedData: NhlApiLiveFeedRequest
): IngestorGameData => {
  const teamStats: IngestorGameDataTeamStats[] = [];
  const playerStats: IngestorGameDataPlayerStats[] = [];
  const gameId = nhlLiveFeedData.gamePk;
  const gameStatus = ['1', '8', '9'].includes(
    nhlLiveFeedData.gameData.status.statusCode
  )
    ? IngestorGameDataGameStatus.PENDING
    : ['2', '3', '4'].includes(nhlLiveFeedData.gameData.status.statusCode)
    ? IngestorGameDataGameStatus.LIVE
    : IngestorGameDataGameStatus.COMPLETE;

  // Get player stats for the home team
  Object.keys(nhlLiveFeedData.liveData.boxscore.teams.home.players).forEach(
    playerKey => {
      const player =
        nhlLiveFeedData.liveData.boxscore.teams.home.players[playerKey];
      playerStats.push({
        name: player.person.fullName,
        id: player.person.id,
        assists: player.stats.skaterStats?.assists || 0,
        goals: player.stats.skaterStats?.goals || 0,
        hits: player.stats.skaterStats?.hits || 0,
        points:
          (player.stats.skaterStats?.goals || 0) +
          (player.stats.skaterStats?.assists || 0),
        penaltyMinutes: player.stats.skaterStats?.penaltyMinutes || 0,
        opponentName: nhlLiveFeedData.liveData.boxscore.teams.away.team.name,
        opponentId: nhlLiveFeedData.liveData.boxscore.teams.away.team.id,
      });
    }
  );

  // Get player stats for the away team
  Object.keys(nhlLiveFeedData.liveData.boxscore.teams.away.players).forEach(
    playerKey => {
      const player =
        nhlLiveFeedData.liveData.boxscore.teams.away.players[playerKey];
      playerStats.push({
        name: player.person.fullName,
        id: player.person.id,
        assists: player.stats.skaterStats?.assists || 0,
        goals: player.stats.skaterStats?.goals || 0,
        hits: player.stats.skaterStats?.hits || 0,
        points:
          (player.stats.skaterStats?.goals || 0) +
          (player.stats.skaterStats?.assists || 0),
        penaltyMinutes: player.stats.skaterStats?.penaltyMinutes || 0,
        opponentName: nhlLiveFeedData.liveData.boxscore.teams.home.team.name,
        opponentId: nhlLiveFeedData.liveData.boxscore.teams.home.team.id,
      });
    }
  );

  // Get teams stats
  const homeTeamBoxScore = nhlLiveFeedData.liveData.boxscore.teams.home;
  const awayTeamBoxScore = nhlLiveFeedData.liveData.boxscore.teams.away;
  teamStats.push({
    name: homeTeamBoxScore.team.name,
    id: homeTeamBoxScore.team.id,
    goals: homeTeamBoxScore.teamStats.teamSkaterStats?.goals || 0,
    hits: homeTeamBoxScore.teamStats.teamSkaterStats?.hits || 0,
    penaltyMinutes: homeTeamBoxScore.teamStats.teamSkaterStats?.pim || 0,
    opponentName: awayTeamBoxScore.team.name,
    opponentId: awayTeamBoxScore.team.id,
  });
  teamStats.push({
    name: awayTeamBoxScore.team.name,
    id: awayTeamBoxScore.team.id,
    goals: awayTeamBoxScore.teamStats.teamSkaterStats?.goals || 0,
    hits: awayTeamBoxScore.teamStats.teamSkaterStats?.hits || 0,
    penaltyMinutes: awayTeamBoxScore.teamStats.teamSkaterStats?.pim || 0,
    opponentName: homeTeamBoxScore.team.name,
    opponentId: homeTeamBoxScore.team.id,
  });

  return {
    gameId,
    gameStatus,
    teamStats,
    playerStats,
  };
};

export const storeGameData = async (
  gameData: IngestorGameData
): Promise<IngestorStoreDataResult | Error> => {
  try {
    return {
      message: `Game data stored for gameId: '${gameData.gameId}'`,
      success: true,
    };
  } catch (e) {
    return new Error(e);
  }
};

// export const writeIngestorProcessProgress = async (
//   processProgressData: IngestorProcessProgress
// ): Promise<true | Error> => {
//   return true;
// };

export const ingestorProcess = async (
  processId: string,
  gameId: number
): Promise<IngestorProcessResponse | IngestorProcessError> => {
  let processStage: IngestorProcessStage = IngestorProcessStage.STARTING;
  let processStatus: IngestorProcessStatus = IngestorProcessStatus.PENDING;
  try {
    // Validation Stage
    processStatus = IngestorProcessStatus.WORKING;
    processStage = IngestorProcessStage.VALIDATING;
    const gameIdCheck = checkGameId(gameId);
    if (gameIdCheck instanceof Error)
      throw { message: gameIdCheck.message, processStage };

    // Data Fetching Stage
    processStage = IngestorProcessStage.GETTING_DATA;
    const nhlLiveFeedData = await fetchNhlLiveFeed(gameId);
    if (nhlLiveFeedData instanceof Error)
      throw { message: nhlLiveFeedData.message, processStage };

    // Data Parsing Stage
    processStage = IngestorProcessStage.PARSING_DATA;
    const gameData = parseGameDataFromNhlLiveFeedData(nhlLiveFeedData);

    // Data Storing Stage
    processStage = IngestorProcessStage.WRITING_TO_DB;
    const dataStoreResult = await storeGameData(gameData);
    if (dataStoreResult instanceof Error)
      throw { message: dataStoreResult.message, processStage };

    // Process Completion
    processStatus = IngestorProcessStatus.COMPLETED;
    processStage = IngestorProcessStage.COMPLETED;
    return {
      success: true,
      message: 'Game successfully ingested',
      gameData,
    };
  } catch (e) {
    processStatus = IngestorProcessStatus.ERROR;
    console.log(`ERROR: ${e.message}`);
    const ingestorProcessError: IngestorProcessError = {
      processStage: e.processStage,
      processStatus,
      message: e.message,
      processId,
      gameId,
    };
    return ingestorProcessError;
  }
};

export const ingestorHandler = (gameId: number): IngestorHandlerReturn => {
  const processId = uuidv4();
  ingestorProcess(processId, gameId);
  return {
    gameId,
    processId,
    message: `Ingestor invoked with the id of '${processId}' for gameId of '${gameId}'`,
  };
};
