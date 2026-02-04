import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { container } from "../../infra/container/index.js";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase.js";
import type { CreateRentalDTO } from "../../application/useCases/createRental/CreateRentalDTO.js";

const createRentalUseCase = container.get<CreateRentalUseCase>(CreateRentalUseCase);

async function AddAluguel(info: string[]){
    
    const [carId, userId, dataE] = info;

    if (!carId || !userId || !dataE){
        throw new Error("Padrão de Uso: adicionar_aluguel Chassi User Data");
    }

    try{
        const input: CreateRentalDTO = {
        Car_id: carId,
        User_id: userId,
        DataE: new Date(dataE)
        };

        const CDU = await createRentalUseCase.execute(input);

        console.log(`\n Aluguel agendado com sucesso!`);
        console.log(`ID: ${CDU.id} | Usuário: ${CDU.User_id} | Chassi: ${CDU.Car_id} | Entrega Estimada: ${CDU.DataE.toLocaleString('pt-BR')}`);

    } catch(error: any){
        console.log(`Erro ao agendar`);
    }
}

async function run(){
    const linha = process.argv.slice(2);
    const command = linha[0];

    if (command === 'adicionar_aluguel'){
        await AddAluguel(linha.slice(1));
    } else{
        console.log('Comando desconhecido. Use: adicionar_aluguel');
    }
}

run().catch((e) => {
    process.exit(1);
});