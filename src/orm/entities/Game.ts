import {
  Check,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Season } from './Season';
import { GameStatLine } from './GameStatLine';
import { Team } from './Team';

@Entity()
@Check(`"homeTeamId" != "awayTeamId"`)
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'bigint' })
  nhlId: number;

  @ManyToOne(() => Season, season => season.games)
  season: Season;

  @OneToMany(() => GameStatLine, gameStatLine => gameStatLine.game)
  stats: GameStatLine[];

  @ManyToOne(() => Team, team => team.homeGames)
  homeTeam: Team;

  @ManyToOne(() => Team, team => team.awayGames)
  awayTeam: Team;
}
