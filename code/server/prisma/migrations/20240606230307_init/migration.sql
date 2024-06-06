-- CreateEnum
CREATE TYPE "grupoMuscular" AS ENUM ('Peito', 'Costas', 'Perna', 'Ombro', 'Abdomem', 'Biceps', 'Triceps', 'Panturrilha');

-- CreateEnum
CREATE TYPE "diaSemana" AS ENUM ('Segunda_feira', 'Terca_feira', 'Quarta_feira', 'Quinta_feira', 'Sexta_feira', 'Sabado', 'Domingo');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treino" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "grupoMuscular" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "imagemBanner" TEXT NOT NULL DEFAULT '',
    "isOriginal" BOOLEAN NOT NULL DEFAULT true,
    "treinoOriginalId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "treino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercicio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "treinoId" INTEGER NOT NULL,

    CONSTRAINT "exercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serieExercicio" (
    "id" SERIAL NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "peso" INTEGER NOT NULL,
    "exercicioId" INTEGER NOT NULL,

    CONSTRAINT "serieExercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treinoCompartilhado" (
    "id" SERIAL NOT NULL,
    "treinoCompartilhadoId" INTEGER NOT NULL,
    "enviadoPorId" INTEGER NOT NULL,
    "isEditable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenCompartilhamento" TEXT NOT NULL,

    CONSTRAINT "treinoCompartilhado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treinoRealizado" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "descricao" TEXT,
    "foto" TEXT,
    "treino_iniciado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "treino_finalizado" TIMESTAMP(3) NOT NULL,
    "treinoId" INTEGER NOT NULL,

    CONSTRAINT "treinoRealizado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comunidade" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "qntMembros" INTEGER NOT NULL DEFAULT 1,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataDeInicio" TIMESTAMP(3) NOT NULL,
    "dataDeFim" TIMESTAMP(3) NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Comunidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_treinosCriadosPeloCompartilhamento" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Recebimentos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MembrosDaComunidade" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE INDEX "usuario_email_idx" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "treinoCompartilhado_tokenCompartilhamento_key" ON "treinoCompartilhado"("tokenCompartilhamento");

-- CreateIndex
CREATE INDEX "treinoCompartilhado_treinoCompartilhadoId_idx" ON "treinoCompartilhado"("treinoCompartilhadoId");

-- CreateIndex
CREATE UNIQUE INDEX "Comunidade_token_key" ON "Comunidade"("token");

-- CreateIndex
CREATE INDEX "Comunidade_adminId_idx" ON "Comunidade"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "_treinosCriadosPeloCompartilhamento_AB_unique" ON "_treinosCriadosPeloCompartilhamento"("A", "B");

-- CreateIndex
CREATE INDEX "_treinosCriadosPeloCompartilhamento_B_index" ON "_treinosCriadosPeloCompartilhamento"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Recebimentos_AB_unique" ON "_Recebimentos"("A", "B");

-- CreateIndex
CREATE INDEX "_Recebimentos_B_index" ON "_Recebimentos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MembrosDaComunidade_AB_unique" ON "_MembrosDaComunidade"("A", "B");

-- CreateIndex
CREATE INDEX "_MembrosDaComunidade_B_index" ON "_MembrosDaComunidade"("B");

-- AddForeignKey
ALTER TABLE "treino" ADD CONSTRAINT "treino_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercicio" ADD CONSTRAINT "exercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serieExercicio" ADD CONSTRAINT "serieExercicio_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "exercicio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treinoCompartilhado" ADD CONSTRAINT "treinoCompartilhado_treinoCompartilhadoId_fkey" FOREIGN KEY ("treinoCompartilhadoId") REFERENCES "treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treinoCompartilhado" ADD CONSTRAINT "treinoCompartilhado_enviadoPorId_fkey" FOREIGN KEY ("enviadoPorId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treinoRealizado" ADD CONSTRAINT "treinoRealizado_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treinoRealizado" ADD CONSTRAINT "treinoRealizado_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comunidade" ADD CONSTRAINT "Comunidade_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_treinosCriadosPeloCompartilhamento" ADD CONSTRAINT "_treinosCriadosPeloCompartilhamento_A_fkey" FOREIGN KEY ("A") REFERENCES "treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_treinosCriadosPeloCompartilhamento" ADD CONSTRAINT "_treinosCriadosPeloCompartilhamento_B_fkey" FOREIGN KEY ("B") REFERENCES "treinoCompartilhado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Recebimentos" ADD CONSTRAINT "_Recebimentos_A_fkey" FOREIGN KEY ("A") REFERENCES "treinoCompartilhado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Recebimentos" ADD CONSTRAINT "_Recebimentos_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembrosDaComunidade" ADD CONSTRAINT "_MembrosDaComunidade_A_fkey" FOREIGN KEY ("A") REFERENCES "Comunidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembrosDaComunidade" ADD CONSTRAINT "_MembrosDaComunidade_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
