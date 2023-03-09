# NHL Stats Ingestor
This project is a NodeJS service that ingests stats from the NHL Stats API and stores them in a local database for analysis or distribution. It is setup to store in a local SQLite DB. It could be forked and made to be used with a Postgres or MySQL DB (or even MongoDB) with some slight configuration and minor refactoring.

## Initial Setup:
In order to install all depenedencies and to initiate the DB for this project please run the `yarn setup` command.

***NOTE*** You can run this command again should you ever want to delete your db and start over or should you ever delete the `node_module` folder by mistake.

## Starting the Service
In order to start the service you can run `npm start`

## Development

### Running the Service in Watch Mode (Auto-refresh)
In order to start the service in auto-refresh mode use `npm-dev`. This relies on the `ts-node-dev` module.

### Testing
This project uses the popular `jest` module in order to perform unit and e2e tests. For in-depth documentation on Jest you can visit the [Jest Documentation Site](https://jestjs.io/docs/getting-started)

In order to run the tests for this project use the `yarn test` command. If you have a specific file you would like to test you can do so by using  `yarn test path/to/test/file.spec.ts`.

### ORM (TypeORM)
This project uses the power of TypeORM. In order to access in-depth documentation visit the [TypeORM Documentation Site](https://typeorm.io/).