-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('Tecido');

-- CreateTable
CREATE TABLE "Costureira" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(70) NOT NULL,
    "demandaQnt" INTEGER NOT NULL,
    "dataEntrega" TIMESTAMP(3) NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Costureira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto_has_costureira" (
    "id" SERIAL NOT NULL,
    "costureiraId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,

    CONSTRAINT "Produto_has_costureira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "tipo" "Tipo" NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produto_has_costureira" ADD CONSTRAINT "Produto_has_costureira_costureiraId_fkey" FOREIGN KEY ("costureiraId") REFERENCES "Costureira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto_has_costureira" ADD CONSTRAINT "Produto_has_costureira_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
