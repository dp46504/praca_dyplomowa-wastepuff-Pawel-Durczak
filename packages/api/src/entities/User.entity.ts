import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Pack } from './Pack.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((type) => Pack, (pack) => pack.owner, { cascade: true })
  packs: Pack[];

  @OneToOne(() => Pack, { nullable: true })
  @JoinColumn()
  activePack: Pack;
}
