export class Rental{
  id: string;
  Car_id: string;
  User_id: string;
  DataI: Date;
  DataF: Date;

  constructor(id: string, Car_id: string, User_id: string, DataF: Date){
    this.id = id;
    this.Car_id = Car_id;
    this.User_id = User_id;
    this.DataI = new Date(); 
    this.DataF = DataF;
  }
}