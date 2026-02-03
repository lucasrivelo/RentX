import "reflect-metadata";
import { container } from "../../infra/container/index.js"; // Seu container Inversify
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase.js";
import type { CreateRentalDTO } from "../../application/useCases/createRental/CreateRentalDTO.js";

export class CreateRentalCLI {
  async run() {
    const createRentalUseCase = container.get<CreateRentalUseCase>(CreateRentalUseCase);

    const input: CreateRentalDTO = {
      Car_id: "teste_idcarro",
      User_id: "teste_iduser",
      DataE: new Date("2026-06-01T10:00:00Z")
    };

    try {
      console.log("Tentando criar aluguel...");
      
      const rental = await createRentalUseCase.execute(input);

      console.log(" Sucesso ao criar aluguel.");
      console.log(rental);
      
    } catch (error: any) {

      console.log("Erro ao criar aluguel.", error.message);
    }
  }
}

const cli = new CreateRentalCLI();
cli.run();