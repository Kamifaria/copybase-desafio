import axios from 'axios'

const baseUrl = "http://localhost:3000"

interface Subscriber {
    month?: string
    quantidadeCobranca: number,
    cobrancaACadaXDias: number,
    dataInicio: string,
    status: string,
    dataStatus: string,
    dataCancelamento?: string,
    valor: number,
    proximoCiclo: string,
    idAssinante: string,
}

class SubscriberService {

    getSubscribers(): Promise<Subscriber[]> {
        return axios.get(`${baseUrl}/subscriber`)
            .then((response) => {
                return response.data as Subscriber[]
            })
    }
}


export { SubscriberService, Subscriber }