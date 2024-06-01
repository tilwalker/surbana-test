import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "src/entities/location.entity";
import { CreateLocationDto } from "src/modules/locations/dto/create-location.dto";
import { UpdateLocationDto } from "src/modules/locations/dto/update-location.dto";
import { In, IsNull, Repository } from "typeorm";

export class LocationRepository {
    constructor(
        @InjectRepository(Location) private readonly locationRepo: Repository<Location>
    ) { }

    async findById(id: number) {
        return this.locationRepo.findOne({
            where: {
                id,
                deleted_at: IsNull()
            }
        })
    }

    async createLocation(payload: CreateLocationDto): Promise<Location> {
        const location = this.locationRepo.create({...payload, created_at: new Date()});
        return this.locationRepo.save(location);
    }

    async updateLocation(id: number, payload: UpdateLocationDto): Promise<Location> {
        return this.locationRepo.save({id, ...payload});
    }

    async removeLocation(ids: number[]) {
        return this.locationRepo.update({id: In(ids)}, { deleted_at: new Date() })
    }

    async findListChild(parent_id: number) {
        return this.locationRepo.findBy({
            parent_id
        })
    }

    async findListChildByParentIds(parent_ids: number[]) {
        return this.locationRepo.findBy({
            parent_id: In(parent_ids)
        })
    }

    async findLocation(payload: { paging: {
        limit: number,
        skip: number
    } }) {
        return this.locationRepo.find({
            where: {
                deleted_at: IsNull()
            },
            order: {
                building: "ASC",
                id: "ASC",
            },
            skip: payload.paging.skip,
            take: payload.paging.limit
        })
    }

}