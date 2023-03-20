-- CreateTable
CREATE TABLE "Franchise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nhlId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "FranchiseStatLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "franchiseId" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "FranchiseStatLine_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nhlId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "homeTeamId" INTEGER NOT NULL,
    "awayTeamId" INTEGER NOT NULL,
    CONSTRAINT "Game_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameStatLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "GameStatLine_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nhlId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PlayerStatLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "PlayerStatLine_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startYear" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SeasonStatLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seasonId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
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
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nhlId" INTEGER NOT NULL,
    "franchiseId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    CONSTRAINT "Team_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Team_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamStatLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "TeamStatLine_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamPlayer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "TeamPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamPlayerStatLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamPlayerId" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    "penaltyMinutes" REAL NOT NULL,
    CONSTRAINT "TeamPlayerStatLine_teamPlayerId_fkey" FOREIGN KEY ("teamPlayerId") REFERENCES "TeamPlayer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameStatLineToTeamPlayer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
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
CREATE UNIQUE INDEX "GameStatLine_gameId_key" ON "GameStatLine"("gameId");

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
CREATE UNIQUE INDEX "TeamPlayer_playerId_teamId_key" ON "TeamPlayer"("playerId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamPlayerStatLine_teamPlayerId_key" ON "TeamPlayerStatLine"("teamPlayerId");

-- CreateIndex
CREATE UNIQUE INDEX "_GameStatLineToTeamPlayer_AB_unique" ON "_GameStatLineToTeamPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_GameStatLineToTeamPlayer_B_index" ON "_GameStatLineToTeamPlayer"("B");
