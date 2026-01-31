export class Rental{
  id: string;
  Car_id: string;
  User_id: string;
  DataI: Date;
  DataE: Date;
  DataF?: Date;

  constructor(id: string, Car_id: string, User_id: string, DataE: Date){
    this.id = id;
    this.Car_id = Car_id;
    this.User_id = User_id;
    this.DataI = new Date(); 
    this.DataE = DataE;

    const padrao = 24*60*60*1000;
    const duracaoP = this.DataE.getTime() - this.DataI.getTime();

    if (duracaoP<padrao){
      throw new Error("Duração de Devolução Prevista menor do que o padrão (24 Horas).");
    }
  }
}