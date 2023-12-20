import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Alumni } from './Alumni.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @ManyToOne(() => Alumni, (al) => al.id)
  alumni!: Alumni;
}
