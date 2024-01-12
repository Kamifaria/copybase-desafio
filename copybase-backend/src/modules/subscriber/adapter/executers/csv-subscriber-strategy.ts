import { CreateSubscriberDto, Periodicidade, Status } from '../../dto/create-subscriber-dto'
import { SubscriberFactoryInterface, SubscriberStrategyType } from '../subscriber-factory-interface'

export class CsvSubsCriberStrategy implements SubscriberFactoryInterface {

    private readonly LINE_SEPARATOR = "\n"
    private readonly COLUMN_SEPARATOR = ","

    getStrategy() {
        return SubscriberStrategyType.CSV
    }

    private getDate(dateString: string){
        const parsedDate = new Date(dateString.trim())
        const isInvalidDate = parsedDate.toString() === 'Invalid Date'
        if(isInvalidDate){
            const [day, month, year] = dateString.split("/")
            const directparsedDate = new Date()
            directparsedDate.setDate(Number(day))
            directparsedDate.setMonth(Number(month))
            directparsedDate.setFullYear(Number(year))
            return directparsedDate
        }
        return parsedDate
    }

    execute(file: Express.Multer.File): Promise<CreateSubscriberDto[]> {
        const stringFile = file.buffer.toString().trim().split(this.LINE_SEPARATOR)
        stringFile.shift()
        let lineProcessing = 0
        try {
            const createSubsCribers: CreateSubscriberDto[] = stringFile.map((line: string) => {
                const [
                    periodicidade,
                    quantidadeCobranca,
                    cobrancaACadaXDias,
                    dataInicio,
                    status,
                    dataStatus,
                    dataCancelamento,
                    valor,
                    proximoCiclo,
                    idAssinante
                ] = line.split(this.COLUMN_SEPARATOR)

                const subscriber = new CreateSubscriberDto()

                subscriber.periodicidade = Periodicidade[periodicidade.toUpperCase()]
                subscriber.quantidadeCobranca = Number(quantidadeCobranca)
                subscriber.cobrancaACadaXDias = Number(cobrancaACadaXDias)
                subscriber.dataInicio = this.getDate(`${dataInicio}-03:00`)
                subscriber.status = Status[status.toUpperCase().replace(" ", "")]
                subscriber.dataStatus = this.getDate(dataStatus)
                subscriber.dataCancelamento = dataCancelamento ? this.getDate(dataCancelamento) : null
                subscriber.valor = Number(valor)
                subscriber.proximoCiclo = this.getDate(proximoCiclo.trim())
                subscriber.idAssinante = idAssinante

                lineProcessing++

                return subscriber

            })
            return Promise.resolve(createSubsCribers)

        } catch (error) {
            console.error(`Error on process line ${lineProcessing} of file`)
            throw error
        }
    }

}