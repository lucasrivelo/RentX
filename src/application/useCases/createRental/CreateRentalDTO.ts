import { inject, injectable } from "inversify";
import { TYPES } from "../../../infra/container/types.js";
import { Rental } from "../../../domain/entities/Rental.js";
import type { IRentalRepo } from "../../../domain/repositories/IRentalRepository.js";
import type { ICarRepo } from "../../../domain/repositories/ICarRepository.js";

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(TYPES.IRentalRepo) private rentalRepo: IRentalRepo,
    @inject(TYPES.ICarRepo) private carRepo: ICarRepo
  ) {}

  async casoDeUso(Car_id: string, User_id: string, DataE: Date): Promise<Rental> {

    const verificaCar = await this.carRepo.buscaId(Car_id);
    if (!verificaCar) throw new Error("Carro não encontrado.");

    if (!verificaCar.available) throw new Error("Este carro já está alugado por outra pessoa.");

    const verificarAluguel = await this.rentalRepo.listarAluguelDisponivel(User_id);
    if (verificarAluguel) {
      throw new Error("Usuário já possui um aluguel em andamento.");
    }

    const rental = new Rental(undefined, Car_id, User_id, DataE);

    await this.rentalRepo.criar(rental);
    await this.carRepo.updateDisponivel(Car_id, false);

    return rental;
  }
}