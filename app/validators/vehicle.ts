import vine from '@vinejs/vine'
import { validateCpfOrCnpj } from './rule/cpf_or_cnpj.js'

export const vehicleValidator = vine.compile(
  vine.object({
    vin: vine.string(),

    documento_proprietario: vine.string().use(validateCpfOrCnpj()),

    data_fabricacao: vine.date(),
    data_entrega: vine.date().optional(),
    data_venda: vine.date().optional(),
    data_ultimo_reparo: vine.date().optional(),
  })
)