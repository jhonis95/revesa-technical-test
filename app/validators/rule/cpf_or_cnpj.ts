import vine from "@vinejs/vine";
import { FieldContext } from "@vinejs/vine/types";
import {cpf, cnpj } from "cpf-cnpj-validator";

export const validateCpfOrCnpj=vine.createRule(()=>{
    return {
        //dentro de uma regra customizada do @vinejs/vine tem três parâmetros por design da API do VineJS, validate(value, options, field)
        async validate(value:string, _:undefined, field:FieldContext){
            const isValid = cpf.isValid(value) || cnpj.isValid(value)
            if (!isValid) {
              field.report('O documento deve ser um CPF ou CNPJ válido', 'cpfOrCnpj', field)
            }
        }
    }
})