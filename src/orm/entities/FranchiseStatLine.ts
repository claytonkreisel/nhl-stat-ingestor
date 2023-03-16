import { Entity, OneToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Franchise } from './Franchise';

@Entity()
export class FranchiseStatLine {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Franchise, franchise => franchise.stats)
  franchise: Franchise;

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
