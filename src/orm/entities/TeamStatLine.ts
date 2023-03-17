import { Entity, OneToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Team } from './Team';

@Entity()
export class TeamStatLine {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Team, team => team.stats)
  team: Team;

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
