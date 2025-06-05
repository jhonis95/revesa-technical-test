import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('vin').notNullable().unique()
      table.string('placa').notNullable()
      table.string('modelo').notNullable()

      table.date('data_fabricacao').notNullable()
      table.date('data_entrega').nullable()
      table.date('data_venda').nullable()

      table.string('pais_operacao').nullable()
      table.string('concessionaria_venda').nullable()

      table.date('data_ultimo_reparo').nullable()
      table.string('documento_proprietario').notNullable()

      table.timestamp('ultima_atualizacao', { useTz: true })

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}