import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Franchise } from './Franchise';
import { Season } from './Season';
import { TeamPlayer } from './TeamPlayer';
import { Game } from './Game';
import { TeamStatLine } from './TeamStatLine';

@Entity()
@Unique('UQ_FranchiseSeason', ['franchise', 'season'])
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  name: string;

  @Column({ type: 'bigint' })
  nhlId: number;

  @ManyToOne(() => Franchise, franchise => franchise.teams)
  franchise: Franchise;

  @ManyToOne(() => Season, season => season.teams)
  season: Season;

  @OneToMany(() => TeamPlayer, teamPlayer => teamPlayer.team)
  players: TeamPlayer[];

  @OneToMany(() => Game, game => game.homeTeam)
  homeGames: Game[];

  @OneToMany(() => Game, game => game.awayTeam)
  awayGames: Game[];

  @OneToOne(() => TeamStatLine, teamStatLine => teamStatLine.team)
  @JoinColumn()
  stats: TeamStatLine;
}
