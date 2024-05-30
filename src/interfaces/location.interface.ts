export interface LocationInterface {
    id: number,
    building: string,
    name: string,
    parent_location: string[],
    parent_id: number,
    level: number,
    coordinates: number[],
    area: number
}