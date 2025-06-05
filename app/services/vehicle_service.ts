import Vehicle from "#models/vehicle";
import { DateTime } from 'luxon';

export class VehicleService {
  //RF01: A API deve permitir criar um novo veículo.
  async createVehicle(data:any){//add the data type of create Vehicle
    await Vehicle.create(data)
  }
  //RF02: A API deve permitir listar todos os veículos.
  async allVehicle(){
    await Vehicle.all()
  }
  //RF03: A API deve permitir buscar um veículo por ID.
  async getVehicle(id:number){
    await Vehicle.find(id)
    
  }
  //RF04: A API deve permitir atualizar os dados de um veículo.
  async updateVehicle(id:number,toChange:string,value:string|any){ //take out all any and add the right DTO
    const vehicle = await Vehicle.find(id)
    let updated = false
    if (!vehicle) {
      throw new Error(`Vehicle com o  id ${id} não encontrado`);
    }
    switch(toChange){
      case 'placa':
        vehicle.placa=value
        await vehicle.save()
        updated = true
      break;
      case 'modelo':
        vehicle.modelo=value
        await vehicle.save()
        updated = true
      break;
      case 'data_entrega':
        vehicle.dataEntrega=value
        await vehicle.save()
        updated = true
      break;
      case 'data_fabricacao':
        vehicle.dataFabricacao=value
        await vehicle.save()
        updated = true
      break;
      case 'data_venda':
        vehicle.dataVenda=value
        await vehicle.save()
        updated = true
      break;
      case 'pais_operacao':
        vehicle.paisOperacao=value
        await vehicle.save()
        updated = true
      break;
      case 'concessionaria_venda':
        vehicle.concessionariaVenda=value
        await vehicle.save()
        updated = true
      break;
      case 'data_ultimo_reparo':
        vehicle.dataUltimoReparo=value
        await vehicle.save()
        updated = true
      break;
      case 'documento_proprietario':
        vehicle.documentoProprietario=value
        await vehicle.save()
        updated = true
      break;
    }
    if (updated) { //
      vehicle.ultimaAtualizacao = DateTime.now()
      await vehicle.save()
    }
  }
  //RF05: A API deve permitir deletar um veículo.
  async deleteVehicle(id:number){
    const vehicle = await Vehicle.find(id)
    if (!vehicle) {
      throw new Error(`Vehicle with id ${id} not found`);
    }
    await vehicle.delete()
  }
}