import { title } from 'process';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class product {
  @PrimaryColumn({
     name: 'id',
     type : 'varchar'
  })
  id: string;

  @Column({
    name : 'title',
    type : 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'description',
    type : 'varchar',
    nullable: false,
    
  })
  description: string;

  @Column({
    name : 'price',
    type : 'float',
    nullable: false,
    
  })
  price : number;
}