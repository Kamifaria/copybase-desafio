import { Row, Workbook } from 'exceljs';
import { CreateSubscriberDto, Periodicidade, Status } from '../../dto/create-subscriber-dto'
import { SubscriberFactoryInterface, SubscriberStrategyType } from '../subscriber-factory-interface'
const ExcelJS = require('exceljs');

export class XlsxSubsCriberStrategy implements SubscriberFactoryInterface {

    private readonly exceljs = ExcelJS

    getStrategy() {
        return SubscriberStrategyType.XLSX
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

    async execute(file: Express.Multer.File): Promise<CreateSubscriberDto[]> {
        const workbook = new this.exceljs.Workbook();
        const bufferCast = file.buffer as unknown as Workbook
        const worksheet = await workbook.xlsx.load(bufferCast);
        const rows = []
        await worksheet.xlsx.workbook.eachSheet((sheet, id) => {
            sheet.eachRow((row, rowIndex) => {
              rows.push(row)
            })
        })

        rows.shift()
        let lineProcessing = 0
        try {
            const createSubsCribers: CreateSubscriberDto[] = rows.map((row: Row) => {
                const periodicidade = row.getCell(1).value.toString()
                const quantidadeCobranca = row.getCell(2).value
                const cobrancaACadaXDias = row.getCell(3).value
                const dataInicio = row.getCell(4).value as unknown as Date
                const status = row.getCell(5).value.toString()
                const dataStatus = row.getCell(6).value as unknown as Date
                const dataCancelamento = row.getCell(7).value
                const valor = row.getCell(8).value
                const proximoCiclo = row.getCell(9).value?.toString()
                const idAssinante = row.getCell(10).value.toString()

                const subscriber = new CreateSubscriberDto()

                subscriber.periodicidade = Periodicidade[periodicidade.toUpperCase()]
                subscriber.quantidadeCobranca = Number(quantidadeCobranca)
                subscriber.cobrancaACadaXDias = Number(cobrancaACadaXDias)
                subscriber.dataInicio = dataInicio
                subscriber.status = Status[status.toUpperCase().replace(" ", "")]
                subscriber.dataStatus = dataStatus
                subscriber.dataCancelamento = dataCancelamento ? dataCancelamento as unknown as Date : null
                subscriber.valor = Number(valor)
                subscriber.proximoCiclo = this.getDate(proximoCiclo.trim())
                subscriber.idAssinante = idAssinante

                lineProcessing++

                return subscriber

            })
            return createSubsCribers

        } catch (error) {
            console.error(`Error on process line ${lineProcessing} of file`)
            throw error
        }
    }

}