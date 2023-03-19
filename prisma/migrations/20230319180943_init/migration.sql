-- CreateTable
CREATE TABLE "Franchise" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nhlId" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "FranchiseStatLine" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "franchiseId" BIGINT NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "FranchiseStatLine_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Game" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "nhlId" BIGINT NOT NULL,
    "seasonId" BIGINT NOT NULL,
    "homeTeamId" BIGINT NOT NULL,
    "awayTeamId" BIGINT NOT NULL,
    CONSTRAINT "Game_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameStatLine" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "gameId" BIGINT NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "GameStatLine_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Player" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nhlId" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "PlayerStatLine" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "playerId" BIGINT NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "PlayerStatLine_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Season" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "startYear" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SeasonStatLine" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "seasonId" BIGINT NOT NULL,
    "playerId" BIGINT NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "SeasonStatLine_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SeasonStatLine_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nhlId" BIGINT NOT NULL,
    "franchiseId" BIGINT NOT NULL,
    "seasonId" BIGINT NOT NULL,
    CONSTRAINT "Team_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Team_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamStatLine" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "teamId" BIGINT NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "TeamStatLine_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamPlayer" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "teamId" BIGINT NOT NULL,
    "playerId" BIGINT NOT NULL,
    CONSTRAINT "TeamPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamPlayerStatLine" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "teamPlayerId" BIGINT NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "TeamPlayerStatLine_teamPlayerId_fkey" FOREIGN KEY ("teamPlayerId") REFERENCES "TeamPlayer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameStatLineToTeamPlayer" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL,
    CONSTRAINT "_GameStatLineToTeamPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "GameStatLine" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameStatLineToTeamPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamPlayer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_name_key" ON "Franchise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_nhlId_key" ON "Franchise"("nhlId");

-- CreateIndex
CREATE UNIQUE INDEX "FranchiseStatLine_franchiseId_key" ON "FranchiseStatLine"("franchiseId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_nhlId_key" ON "Game"("nhlId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_nhlId_key" ON "Player"("nhlId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStatLine_playerId_key" ON "PlayerStatLine"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Season_startYear_key" ON "Season"("startYear");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonStatLine_playerId_key" ON "SeasonStatLine"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_nhlId_key" ON "Team"("nhlId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamStatLine_teamId_key" ON "TeamStatLine"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamPlayerStatLine_teamPlayerId_key" ON "TeamPlayerStatLine"("teamPlayerId");

-- CreateIndex
CREATE UNIQUE INDEX "_GameStatLineToTeamPlayer_AB_unique" ON "_GameStatLineToTeamPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_GameStatLineToTeamPlayer_B_index" ON "_GameStatLineToTeamPlayer"("B");
