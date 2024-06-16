import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { skip } from 'node:test';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  getLocation(
    @Query() pagingQuery: {
      limit: string,
      skip: string
    }
  ) {
    const paging = {
      limit: pagingQuery.limit ? +pagingQuery.limit : 20,
      skip: pagingQuery.skip ? +pagingQuery.skip : 0,
    }
    return this.locationsService.findAll({ paging });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }

  @Get('tree/:id')
  getListLocations(
    @Param('id') id: string
  ) {
    return this.locationsService.getById(+id)
  }
}
