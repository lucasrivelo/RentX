import { Car } from "../../../domain/entities/Car.js";
import type { ICarRepo } from "../../../domain/repositories/ICarRepository.js";

export class InMemoryCarRepository implements ICarRepo {
    public carros: Car[] = [];

    async criar(car: Car): Promise<void> {
        this.carros.push(car);
    }

    async buscaId(id: string): Promise<Car | null> {
        let busca = this.carros.find((car) => car.chassi === id) || null;
        return busca;
    }

    async listarDisponivel(): Promise<Car[]> {
        let lista = this.carros.filter((car) => car.available);
        return lista;
    }

    async updateDisponivel(id: string, available: boolean): Promise<void> {
        let car = this.carros.find((car) => car.chassi === id);
        if (car) car.available = available;
    }
}