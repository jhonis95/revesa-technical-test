import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare vin: string

  @column()
  declare placa: string

  @column()
  declare modelo: string

  @column.date()
  declare dataEntrega: DateTime

  @column.date()
  declare dataFabricacao: DateTime

  @column.date()
  declare dataVenda: DateTime

  @column()
  declare paisOperacao: string

  @column()
  declare concessionariaVenda: string

  @column.date()
  declare dataUltimoReparo: DateTime

  @column()
  declare documentoProprietario: string

  @column.dateTime()
  declare ultimaAtualizacao: DateTime


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}