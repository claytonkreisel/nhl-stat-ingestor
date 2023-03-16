import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Team } from './Team';
import { Player } from './Player';
import { GameStatLine } from './GameStatLine';
import { TeamPlayerStatLine } from './TeamPlayerStatLine';

@Entity()
@Unique('UQ_PlayerTeam', ['player', 'team'])
export class TeamPlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  team: Team;

  @ManyToOne(() => Player)
  player: Player;

  @OneToMany(() => GameStatLine, gameStatLine => gameStatLine.game)
  stats: GameStatLine[];

  @OneToOne(
    () => TeamPlayerStatLine,
    teamPlayerStatline => teamPlayerStatline.teamPlayer
  )
  allStats: TeamPlayerStatLine;
}
