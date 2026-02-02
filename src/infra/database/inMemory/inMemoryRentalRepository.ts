import { Rental } from "../../../domain/entities/Rental.js";
import type { IRentalRepo } from "../../../domain/repositories/IRentalRepository.js";

export class InMemoryRentalRepository implements IRentalRepo {
    public alugueis: Rental[] = [];

    async criar(aluguel: Rental): Promise<void> {
        this.alugueis.push(aluguel);
    }

    async buscaId(id: string): Promise<Rental | null> {
        let busca = this.alugueis.find((al) => al.id === id) || null;
        return busca;
    }

    async buscaCarId(Car_id: string): Promise<Rental[]> {
        let busca = this.alugueis.filter((al) => al.Car_id === Car_id);
        return busca;
    }

    async listarAluguelDisponivel(User_id: string): Promise<Rental | null> {
        let lista = this.alugueis.find((al) => al.User_id === User_id && !al.DataF) || null;
        return lista;
    }

}