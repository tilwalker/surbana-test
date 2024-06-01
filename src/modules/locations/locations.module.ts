import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationRepository } from 'src/repositories/location.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from 'src/entities/location.entity';

@Module({
  controllers: [LocationsController],
  imports: [
    TypeOrmModule.forFeature([
      Location
    ])
  ],
  providers: [
    LocationsService,
    LocationRepository
  ],
})
export class LocationsModule {}
