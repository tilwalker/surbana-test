import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "src/entities/location.entity";
import { LocationInterface } from "src/interfaces/location.interface";
import { Repository } from "typeorm";

export class LocationRepository {
    constructor(
        @InjectRepository(Location) private readonly locationRepo: Repository<Location>
    ) { }

    async createLocation(payload: LocationInterface): Promise<Location> {
        const location = this.locationRepo.create(payload);
        return this.locationRepo.save(location);
    }

    async findLocation(payload: {  }) {

    }
}