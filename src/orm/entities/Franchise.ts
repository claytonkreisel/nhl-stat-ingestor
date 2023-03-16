import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './Team';
import { FranchiseStatLine } from './FranchiseStatLine';

@Entity()
export class Franchise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, type: 'bigint' })
  nhlId: number;

  @OneToMany(() => Team, team => team.franchise)
  teams: Team[];

  @OneToOne(
    () => FranchiseStatLine,
    franchiseStatLine => franchiseStatLine.franchise
  )
  @JoinColumn()
  stats: FranchiseStatLine;
}
