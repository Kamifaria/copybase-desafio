import * as mongoose from 'mongoose';

export const SubscriberSchema = new mongoose.Schema({
  periodicidade: String,
  quantidadeCobranca: Number,
  cobrancaACadaXDias: Number,
  dataInicio: Date,
  status: String,
  dataStatus: Date,
  dataCancelamento: Date,
  valor: Number,
  proximoCiclo: Date,
  idAssinante: String
});