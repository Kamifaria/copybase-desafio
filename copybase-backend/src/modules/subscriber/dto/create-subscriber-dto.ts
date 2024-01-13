export class CreateSubscriberDto {
    periodicidade: Periodicidade;
    quantidadeCobranca: number;
    cobrancaACadaXDias: number;
    dataInicio: Date;
    status: Status;
    dataStatus: Date;
    dataCancelamento?: Date;
    valor: number;
    proximoCiclo: Date;
    idAssinante: string;

    constructor(){}
}

export enum Periodicidade {
  ANUAL = "ANUAL",
  MENSAL = "MENSAL"
}

export enum Status {
  ATIVA = "ATIVA",
  UPGRADE = "UPGRADE",
  TRIALCANCELADO = "TRIALCANCELADO",
  ATRASADA = "ATRASADA",
  CANCELADA = "CANCELADA"
}