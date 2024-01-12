import { Document } from 'mongoose';

export interface Subscriber extends Document {
  readonly periodicidade: Periodicidade;
  readonly quantidadeCobranca: number;
  readonly cobrancaACadaXDias: number;
  readonly dataInicio: Date;
  readonly status: Status;
  readonly dataStatus: Date;
  readonly dataCancelamento?: Date;
  readonly valor: number;
  readonly proximoCiclo: Date;
  readonly idAssinante: string;
}

export enum Periodicidade {
ANUAL = "ANUAL",
MENSAL = "MENSAL"
}

export enum Status {
ATIVA = "ATIVA",
UPGRADE = "UPGRADE",
TRIAL_CANCELADO = "TRIAL_CANCELADO",
ATRASADA = "ATRASADA"
}