import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('string')
  building: string;

  @Column('string', { nullable: true })
  name: string;
 
  @Column('jsonb', { nullable: true})
  parent_location: string[] // ['A', 1, 3] 

  @Column('int', { nullable: true})
  parent_id: number // parent id of location

  @Column('int')
  level: number

  @Column('jsonb', { nullable: true})
  coordinates: number[]

  @Column('numeric')
  area: number
}
