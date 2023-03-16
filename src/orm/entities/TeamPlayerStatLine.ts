import { Entity, OneToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TeamPlayer } from './TeamPlayer';

@Entity()
export class TeamPlayerStatLine {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TeamPlayer, teamPlayer => teamPlayer.allStats)
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
