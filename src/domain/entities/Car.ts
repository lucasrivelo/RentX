export class Car{
    chassi: string;
    nome: string;
    marca: string;
    avaiable: boolean;

    constructor(chassi: string, nome: string, marca: string){
        this.chassi = chassi;
        this.nome = nome;
        this.marca = marca;
        this.avaiable = true;
    }
}