import { DateTime } from 'luxon'

export type VehicleUpdatableField =
  | 'placa'
  | 'modelo'
  | 'data_entrega'
  | 'data_fabricacao'
  | 'data_venda'
  | 'pais_operacao'
  | 'concessionaria_venda'
  | 'data_ultimo_reparo'
  | 'documento_proprietario'


export interface VehicleCreatePayload {
  vin: string
  placa: string
  modelo: string
  data_fabricacao: DateTime
  data_entrega?:DateTime
  data_venda?: DateTime
  pais_operacao?: string
  concessionaria_venda?: string
  data_ultimo_reparo?: DateTime
  documento_proprietario: string
}