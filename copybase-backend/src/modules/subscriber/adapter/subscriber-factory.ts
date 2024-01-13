import { CsvSubsCriberStrategy } from "./executers/csv-subscriber-strategy";
import { XlsxSubsCriberStrategy } from "./executers/xlsx-subscriber-strategy";
import { SubscriberFactoryInterface } from "./subscriber-factory-interface";

export class SubscriberFactory{

    private readonly strategieRunners = []

    constructor(private readonly csvStrategy: CsvSubsCriberStrategy, private readonly xlsxStrategy: XlsxSubsCriberStrategy){
        this.strategieRunners.push(csvStrategy)
        this.strategieRunners.push(xlsxStrategy)
    }

    getRunner(mimeType: string) : SubscriberFactoryInterface{
        return this.strategieRunners.find((runner: SubscriberFactoryInterface) => {
            return mimeType === runner.getStrategy().toString()
        })
    }

}