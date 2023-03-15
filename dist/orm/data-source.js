"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLiteDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.SQLiteDataSource = new typeorm_1.DataSource({
    type: 'better-sqlite3',
    database: 'nhl-stats.sqlite',
    synchronize: false,
    logging: false,
    entities: ['src/orm/entities/**/*.ts'],
    migrations: ['src/orm/migrations/**/*.ts'],
    subscribers: ['src/orm/subscribers/**/*.ts'],
    migrationsTableName: 'migrations',
});
//# sourceMappingURL=data-source.js.map