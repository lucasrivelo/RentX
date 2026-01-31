-- CreateTable
CREATE TABLE "cars" (
    "chassi" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "rentals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "User_id" TEXT NOT NULL,
    "Car_id" TEXT NOT NULL,
    "DataI" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DataE" DATETIME,
    "DataF" DATETIME,
    CONSTRAINT "rentals_Car_id_fkey" FOREIGN KEY ("Car_id") REFERENCES "cars" ("chassi") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_chassi_key" ON "cars"("chassi");
