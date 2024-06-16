import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepository } from 'src/repositories/location.repository';

@Injectable()
export class LocationsService {
  constructor(
    private locationRepo: LocationRepository
  ) { }

  async create(createLocationDto: CreateLocationDto) {
    try {
      if(createLocationDto.parent_id) {
        const parent = await this.locationRepo.findById(createLocationDto.parent_id);
        if(!parent) {
          return {
            status: HttpStatus.BAD_REQUEST,
            data: null,
            message: 'Parent does not exist!'
          }
        }
        createLocationDto.level = parent.level + 1;
      } else {
        createLocationDto.level = 1;
      }
      const locationCreate = await this.locationRepo.createLocation(createLocationDto);
      return {
        status: HttpStatus.CREATED,
        data: {
          location: locationCreate
        },
        message: 'Create location success!'
      }
    } catch(err) {
      return {
        status: HttpStatus.BAD_GATEWAY,
        data: null,
        message: 'Something when wrong, please try again!',
        sys_error: err
      }
    }
  }

  async findAll(payload: {
    paging: {
      limit: number,
      skip: number
    }
  }) {
    try {
      const data = await this.locationRepo.findLocation(payload);
      if(!data) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'Location not found'
        }
      }
      return {
        status: HttpStatus.OK,
        data: {
          locations: data
        },
        message: 'Get location success'
      }
    } catch(err) {
      return {
        status: HttpStatus.BAD_GATEWAY,
        data: null,
        message: 'Something when wrong, please try again!',
        sys_error: err
      }
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.locationRepo.findById(id);
      return {
        status: HttpStatus.OK,
        data: {
          locations: data
        },
        message: 'Get list locations success'
      }
    } catch(err) {
      return {
        status: HttpStatus.BAD_GATEWAY,
        data: null,
        message: 'Something when wrong, please try again!',
        sys_error: err
      }
    }
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      const locationExist = await this.locationRepo.findById(id);
      console.log(locationExist)
      if(!locationExist) return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        message: 'Location does not exist'
      }
      if(updateLocationDto.parent_id) {
        const parent = await this.locationRepo.findById(updateLocationDto.parent_id);
        if(!parent) {
          return {
            status: HttpStatus.BAD_REQUEST,
            data: null,
            message: 'Parent does not exist!'
          }
        }
        updateLocationDto.level = parent.level + 1;
      } else {
        updateLocationDto.level = 1;
      }
      const locationUpdate = await this.locationRepo.updateLocation(id, updateLocationDto);
      return {
        status: HttpStatus.OK,
        data: {
          location: locationUpdate
        },
        message: 'Update location success!'
      }
    } catch(err) {
      return {
        status: HttpStatus.BAD_GATEWAY,
        data: null,
        message: 'Something when wrong, please try again!',
        sys_error: err
      }
    }
  }

  async remove(id: number) {
    try {
      const location = await this.locationRepo.findById(id);
      if(!location) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'Location does not exist!'
        }
      }
      let listChildData = await this.locationRepo.findListChildByParentIds([id]);
      const listIdsRemove: Array<number> = [];
      listIdsRemove.push(id);
      while(listChildData.length > 0) {
        listIdsRemove.push(...listChildData.map((location) => location.id));
        listChildData = await this.locationRepo.findListChildByParentIds(listChildData.map((location) => location.id));
      }
      await this.locationRepo.removeLocation(listIdsRemove);
      return {
        status: HttpStatus.OK,
        data: {
          remove_ids: listIdsRemove
        },
        message: 'Remove location success!'
      }

    } catch(err) {
      return {
        status: HttpStatus.BAD_GATEWAY,
        data: null,
        message: 'Something when wrong, please try again!',
        sys_error: err
      }
    }
  }

  async getById(id: number) {
    try {
      const locations = await this.locationRepo.findLocations(id);
      return {
        status: HttpStatus.OK,
        data: {
          locations: locations
        },
        message: 'Remove location success!'
      }

    } catch(err) {
      return {
        status: HttpStatus.BAD_GATEWAY,
        data: null,
        message: 'Something when wrong, please try again!',
        sys_error: err
      }
    }
  }
}
