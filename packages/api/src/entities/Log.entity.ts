import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameOfCigarette: string;

  @Column()
  quantity: number;

  @Column({ type: 'float' })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
