-- CreateEnum
CREATE TYPE "Situacao" AS ENUM ('Aberto', 'Entregue');

-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" SERIAL NOT NULL,
    "data_pedido" TIMESTAMP(3),
    "situacao" "Situacao" NOT NULL DEFAULT E'Aberto',
    "clienteId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidoItem" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER,
    "produtoId" INTEGER,

    CONSTRAINT "pedidoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produto_nome_key" ON "produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_nome_key" ON "cliente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_cpf_key" ON "cliente"("cpf");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidoItem" ADD CONSTRAINT "pedidoItem_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidoItem" ADD CONSTRAINT "pedidoItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
