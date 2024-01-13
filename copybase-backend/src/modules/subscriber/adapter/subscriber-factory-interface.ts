import { CreateSubscriberDto } from "../dto/create-subscriber-dto"

export interface SubscriberFactoryInterface {
    getStrategy() : SubscriberStrategyType
    execute(file: Express.Multer.File) : Promise<CreateSubscriberDto[]>
}

export enum SubscriberStrategyType {
    CSV = "text/csv",
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}