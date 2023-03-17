import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Game } from './Game';
import { TeamPlayer } from './TeamPlayer';

@Entity()
@Unique('UQ_GameTeamPlayer', ['game', 'teamPlayer'])
export class GameStatLine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, game => game.stats)
  game: Game;

  @ManyToOne(() => TeamPlayer, teamPlayer => teamPlayer.gameStats)
  teamPlayer: TeamPlayer;

  @Column({ type: 'integer' })
  goals: number;

  @Column({ type: 'integer' })
  assists: number;

  @Column({ type: 'integer' })
  points: number;

  @Column({ type: 'integer' })
  hits: number;

  @Column({ type: 'float' })
  penaltyMinutes: number;
}
