import { describe, it, expect, beforeEach } from "vitest"; 
import { CreateRentalUseCase } from "./CreateRentalUseCase.js";
import { InMemoryCarRepository } from "../../../infra/database/inMemory/inMemoryCarRepository.js";
import { InMemoryRentalRepository } from "../../../infra/database/inMemory/inMemoryRentalRepository.js";
import { Car } from "../../../domain/entities/Car.js";

describe("Caso de Uso - Rental", () => {
    let carRepo: InMemoryCarRepository;
    let rentalRepo: InMemoryRentalRepository;
    let createRentalUseCase: CreateRentalUseCase;

    beforeEach(() => {
        carRepo = new InMemoryCarRepository();
        rentalRepo = new InMemoryRentalRepository();
        createRentalUseCase = new CreateRentalUseCase(rentalRepo, carRepo);
    });

    it("Criação de um novo aluguel", async () => {
        let car = new Car(undefined, "Polo", "Volkswagen");
        await carRepo.criar(car);

        let amanha = new Date(Date.now()+2*24*60*60*1000);

        let rental = await createRentalUseCase.casoDeUso({
            Car_id: car.chassi,
            User_id: "Maria",
            DataE: amanha
        });

        expect(rental).toHaveProperty("id");
        expect(car.available).toBe(false);
    });

    it("Verifica e barra um novo aluguel de um carro ainda não devoldido", async () => {
        let car = new Car(undefined, "Jetta", "Volkswagen");
        car.available = false; 
        await carRepo.criar(car);

        let amanha = new Date(Date.now()+2*24*60*60*1000);
        await expect(
        createRentalUseCase.casoDeUso({
            Car_id: car.chassi,
            User_id: "Maria",
            DataE: amanha
        })
        ).rejects.toThrow("Este carro já está alugado por outra pessoa.");
    });

    it("Verifica e barra um novo aluguel de um cliente que está com um aluguel vigente", async () => {
        let car = new Car(undefined, "Taos", "Volkswagen");
        let car1 = new Car(undefined, "T-Cross", "Volkswagen");
        await carRepo.criar(car);
        await carRepo.criar(car1);

        let amanha = new Date(Date.now()+2*24*60*60*1000);
        await createRentalUseCase.casoDeUso({
            Car_id: car.chassi,
            User_id: "Maria",
            DataE: amanha
        });

        await expect(
            createRentalUseCase.casoDeUso({
            Car_id: car1.chassi,
            User_id: "Maria",
            DataE: amanha
            })
        ).rejects.toThrow("Usuário já possui um aluguel em andamento.");
    });

    it("Carro Inexistente", async () => {
        let amanha = new Date(Date.now()+2*24*60*60*1000);

        await expect(
            createRentalUseCase.casoDeUso({
            Car_id: "soulindo123",
            User_id: "Lucas",
            DataE: amanha
            })
        ).rejects.toThrow("Carro não encontrado.");
    });
});