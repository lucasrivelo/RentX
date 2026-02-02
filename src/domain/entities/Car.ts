export class Car{
    chassi: string;
    name: string;
    brand: string;
    available: boolean;

    constructor(chassi: string = Math.random().toString(36).replace('.', ''), nome: string, marca: string){
        this.chassi = chassi;
        this.name = nome;
        this.brand = marca;
        this.available = true;
    }
}