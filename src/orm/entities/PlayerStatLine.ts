import { Entity, OneToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Player } from './Player';

@Entity()
export class PlayerStatLine {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Player, player => player.stats)
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
