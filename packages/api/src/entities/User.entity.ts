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

  @Column({ type: 'float', nullable: true })
  wasted: number;

  @OneToOne(() => Pack, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  activePack: Pack;
}
