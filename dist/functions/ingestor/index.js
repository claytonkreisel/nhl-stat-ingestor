"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestorMain = exports.getGameData = exports.checkGameId = void 0;
const axios_1 = require("axios");
const checkGameId = (gameId) => {
    if (!Number.isInteger(gameId))
        return new Error('gameId must be integer');
    if (gameId < 1)
        return new Error('gameId must be greater than 0');
    return true;
};
exports.checkGameId = checkGameId;
const getGameData = (gameId) => __awaiter(void 0, void 0, void 0, function* () {
    const gameRequest = yield axios_1.default.get(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`);
    console.log(gameRequest.data);
    const gameData = gameRequest.data;
    return gameData;
});
exports.getGameData = getGameData;
const ingestorMain = (gameId) => {
    try {
        const gameIdCheck = (0, exports.checkGameId)(gameId);
        if (gameIdCheck instanceof Error)
            throw gameIdCheck.message;
        return;
    }
    catch (e) {
        console.error(`ERROR: ${e}`);
        return new Error(e);
    }
};
exports.ingestorMain = ingestorMain;
//# sourceMappingURL=index.js.map