import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './Game';
import { Team } from './Team';
import { SeasonStatLine } from './SeasonStatLine';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', unique: true })
  startYear: number;

  @OneToMany(() => Game, game => game.season)
  games: Game[];

  @OneToMany(() => Team, team => team.season)
  teams: Team[];

  @OneToMany(() => SeasonStatLine, seasonStatLine => seasonStatLine.season)
  playerStats: SeasonStatLine;
}
