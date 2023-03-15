export type IngestorProcessResponse = {
  success: boolean;
  message: string;
  gameData: IngestorGameData;
};

export enum IngestorGameDataGameStatus {
  PENDING = 'pending',
  LIVE = 'live',
  COMPLETE = 'complete',
}

export type IngestorGameDataTeamStats = {
  name: string;
  id: number;
  goals: number;
  hits: number;
  penaltyMinutes: number;
  opponentName: string;
  opponentId: number;
};

export type IngestorGameDataPlayerStats = {
  name: string;
  id: number;
  assists: number;
  goals: number;
  hits: number;
  points: number;
  penaltyMinutes: number;
  opponentName: string;
  opponentId: number;
};

export type IngestorGameData = {
  teamStats: IngestorGameDataTeamStats[];
  playerStats: IngestorGameDataPlayerStats[];
  gameStatus: IngestorGameDataGameStatus;
  gameId: number;
};

export type IngestorStoreDataResult = {
  success: boolean;
  message: string;
};

export type NhlApiTimeZone = {
  id: string;
  offset: number;
  tz: string;
};

export type NhlApiConference = {
  id: number;
  name: string;
  link: string;
};

export type NhlApiFranchise = {
  franchiseId: number;
  teamName: string;
  link: string;
};

export type NhlApiDivision = {
  id: number;
  name: string;
  nameShort: string;
  link: string;
  abbreviation: string;
};

export type NhlApiVenue = {
  id?: number;
  name: string;
  link: string;
  city: string;
  timeZone: NhlApiTimeZone;
};

export type NhlApiTeam = {
  id: number;
  name: string;
  link: string;
  venue: NhlApiVenue;
  abbreviation: string;
  triCode: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: NhlApiDivision;
  conference: NhlApiConference;
  franchise: NhlApiFranchise;
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
};

export type NhlApiPlay = {
  result: {
    event: string;
    eventCode: string;
    eventTypeId: string;
    description: string;
    secondaryType?: string;
    strength?: {
      code: string;
      name: string;
    };
    gameWinningGoal?: boolean;
    emptyNet?: boolean;
    penaltySeverity?: string;
    penaltyMinutes?: number;
  };
  about: {
    eventIdx: number;
    eventId: number;
    period: number;
    periodType: string;
    ordinalNum: string;
    periodTime: string;
    periodTimeRemaining: string;
    dateTime: string;
    goals: {
      away: number;
      home: number;
    };
  };
  coordinates: {
    x?: number;
    y?: number;
  };
  team?: {
    id: number;
    name: string;
    link: string;
    triCode: string;
  };
  players?: {
    player: {
      id: number;
      fullName: string;
      link: string;
    };
    playerType: string;
    seasonTotal?: number;
  }[];
};

export type NhlApiBoxScoreTeam = {
  team: {
    id: number;
    name: string;
    link: string;
    abbreviation: string;
    triCode: string;
  };
  teamStats: {
    teamSkaterStats?: {
      goals: number;
      pim: number;
      shots: number;
      powerPlayPercentage: string;
      powerPlayGoals: number;
      powerPlayOpportunities: number;
      faceOffWinPercentage: string;
      blocked: number;
      takeaways: number;
      giveaways: number;
      hits: number;
    };
  };
  players: {
    [keys: string]: {
      person: {
        id: number;
        fullName: string;
        link: string;
        shootsCatches: string;
        rosterStatus: string;
      };
      jerseyNumber: string;
      position: {
        code: string;
        name: string;
        type: string;
        abbreviation: string;
      };
      stats: {
        skaterStats?: {
          timeOnIce: string;
          assists: number;
          goals: number;
          shots: number;
          hits: number;
          powerPlayGoals: number;
          powerPlayAssists: number;
          penaltyMinutes: number;
          faceOffPct?: number;
          faceOffWins: number;
          faceoffTaken: number;
          takeaways: number;
          giveaways: number;
          shortHandedGoals: number;
          shortHandedAssists: number;
          blocked: number;
          plusMinus: number;
          evenTimeOnIce: string;
          powerPlayTimeOnIce: string;
          shortHandedTimeOnIce?: string;
        };
        goalieStats?: {
          timeOnIce: string;
          assists: number;
          goals: number;
          pim: number;
          shots: number;
          saves: number;
          powerPlaySaves: number;
          shortHandedSaves: number;
          evenSaves: number;
          shortHandedShotsAgainst: number;
          evenShotsAgainst: number;
          powerPlayShotsAgainst: number;
          decision?: string;
          savePercentage?: number;
          powerPlaySavePercentage?: number;
          evenStrengthSavePercentage?: number;
        };
      };
    };
  };
  goalies: number[];
  skaters: number[];
  onIce: number[];
  onIcePlus: {
    playerId: number;
    shiftDuration: number;
    stamina: number;
  }[];
  scratches: number[];
  penaltyBox: number[];
  coaches?: any;
};

export type NhlApiBoxScore = {
  teams: {
    away: NhlApiBoxScoreTeam;
    home: NhlApiBoxScoreTeam;
  };
  officials?: any;
};

export type NhlApiLiveFeedLiveData = {
  plays: {
    allPlays: NhlApiPlay[];
    scoringPlays?: number[];
    penaltyPlays?: number[];
    playsByPeriod: {
      startIndex: number;
      plays: number[];
      endIndex: number;
    }[];
    currentPlay: any;
  };
  linescore: any;
  boxscore: NhlApiBoxScore;
  decisions: any;
};

export type NhlApiLiveFeedPlayerData = {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince?: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  rosterStatus: string;
  currentTeam: {
    id: number;
    name: string;
    link: string;
    triCode: string;
  };
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
};

export type NhlApiLiveFeedGameData = {
  game: {
    pk: number;
    season: string;
    type: string;
  };
  datetime: {
    dateTime?: string;
    endDateTime?: string;
  };
  status: {
    statusCode: string;
    abstractGameState: string;
    detailedState: string;
    codedGameState: string;
    startTimeTBD: boolean;
  };
  teams: {
    home: NhlApiTeam;
    away: NhlApiTeam;
  };
  players: {
    [key: string]: NhlApiLiveFeedPlayerData;
  };
  venue: {
    id?: number;
    name: string;
    link: string;
  };
};

export type NhlApiLiveFeedRequest = {
  copyright: string;
  gamePk: number;
  link: string;
  metaData: {
    wait: number;
    timeStamp: string;
  };
  liveData: NhlApiLiveFeedLiveData;
  gameData: NhlApiLiveFeedGameData;
};

export enum IngestorProcessStage {
  STARTING = 'starting',
  VALIDATING = 'validating',
  GETTING_DATA = 'getting_data',
  PARSING_DATA = 'parsing_data',
  WRITING_TO_DB = 'writing_to_db',
  COMPLETED = 'completed',
}

export enum IngestorProcessStatus {
  PENDING = 'pending',
  WORKING = 'working',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export type IngestorProcessError = {
  message: string;
  processStage: IngestorProcessStage;
  processStatus: IngestorProcessStatus;
  processId: string;
  gameId: number;
};

export type IngestorProcessProgress = {
  processStage: IngestorProcessStage;
  processStatus: IngestorProcessStatus;
  processId: string;
  gameId: number;
};

export type IngestorHandlerReturn = {
  processId: string;
  gameId: number;
  message: string;
};
