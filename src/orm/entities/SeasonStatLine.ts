import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Season } from './Season';
import { Player } from './Player';

@Entity()
@Unique('UQ_SeasonPlayer', ['season', 'player'])
export class SeasonStatLine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Season, season => season.playerStats)
  season: Season;

  @ManyToOne(() => Player)
  player: Player;

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
