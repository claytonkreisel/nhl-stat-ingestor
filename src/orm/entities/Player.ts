import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamPlayer } from './TeamPlayer';
import { PlayerStatLine } from './PlayerStatLine';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  nhlId: number;

  @OneToMany(() => TeamPlayer, teamPlayer => teamPlayer.player)
  teams: TeamPlayer[];

  @OneToOne(() => PlayerStatLine, playerStatLine => playerStatLine.player)
  @JoinColumn()
  stats: PlayerStatLine;
}
