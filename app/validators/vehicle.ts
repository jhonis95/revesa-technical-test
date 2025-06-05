import vine from '@vinejs/vine'
import { validateCpfOrCnpj } from './rule/cpf_or_cnpj.js'
import { DateTime } from 'luxon'

export const vehicleValidator = vine.compile(
  vine.object({
    vin: vine.string().trim().fixedLength(17).regex(/^[A-HJ-NPR-Z0-9]{17}$/),
    placa: vine.string().trim().regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/),
    modelo: vine.string(),

    data_fabricacao: vine.date().transform((value) => DateTime.fromJSDate(value)),
    data_entrega: vine.date().optional().transform((value) => DateTime.fromJSDate(value)),
    data_venda: vine.date().optional().transform((value) => DateTime.fromJSDate(value)),
    
    pais_operacao: vine.string().optional(),
    concessionaria_venda: vine.string().optional(),

    data_ultimo_reparo: vine.date().optional().transform((value) => DateTime.fromJSDate(value)),
    documento_proprietario: vine.string().use(validateCpfOrCnpj()),
  })
)

export const updateVehicleValidator = vine.compile(
  vine.object({
    toChange: vine.enum([
      'placa',
      'modelo',
      'data_entrega',
      'data_fabricacao',
      'data_venda',
      'pais_operacao',
      'concessionaria_venda',
      'data_ultimo_reparo',
      'documento_proprietario',
    ] as const),
    value: vine.any(),
  })
)