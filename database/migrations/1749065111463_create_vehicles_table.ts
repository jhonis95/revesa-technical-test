import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('vin').notNullable().unique()
      table.string('placa').notNullable()
      table.string('modelo').notNullable()

      table.date('data_entrega')
      table.date('data_fabricacao')
      table.date('data_venda')

      table.string('pais_operacao')
      table.string('concessionaria_venda')

      table.date('data_ultimo_reparo')
      table.string('documento_proprietario')

      table.timestamp('ultima_atualizacao', { useTz: true }).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}