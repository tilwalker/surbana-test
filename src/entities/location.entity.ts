import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  building: string;

  @Column('text', { nullable: true })
  name: string;
 
  @Column('jsonb', { nullable: true, default: []})
  parent_location: string[] // ['A', 1, 3] 

  @Column('int', { nullable: true, default: null})
  parent_id: number // parent id of location

  @Column('int', { default: 1 })
  level: number

  @Column('jsonb', { nullable: true})
  coordinates: number[]

  @Column('numeric')
  area: number

  @Column('timestamp', { default: new Date() })
  created_at: Date

  @Column('timestamp', { nullable: true })
  deleted_at: Date
}
