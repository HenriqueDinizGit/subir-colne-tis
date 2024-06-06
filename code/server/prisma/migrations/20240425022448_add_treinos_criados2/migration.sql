/*
  Warnings:

  - You are about to drop the `treinoCriadoPeloCompartilhamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `treinoCriadoPeloCompartilhamento` DROP FOREIGN KEY `treinoCriadoPeloCompartilhamento_treinoCompartilhadoId_fkey`;

-- DropForeignKey
ALTER TABLE `treinoCriadoPeloCompartilhamento` DROP FOREIGN KEY `treinoCriadoPeloCompartilhamento_treinoId_fkey`;

-- DropTable
DROP TABLE `treinoCriadoPeloCompartilhamento`;

-- CreateTable
CREATE TABLE `_treinosCriadosPeloCompartilhamento` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_treinosCriadosPeloCompartilhamento_AB_unique`(`A`, `B`),
    INDEX `_treinosCriadosPeloCompartilhamento_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_treinosCriadosPeloCompartilhamento` ADD CONSTRAINT `_treinosCriadosPeloCompartilhamento_A_fkey` FOREIGN KEY (`A`) REFERENCES `treino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_treinosCriadosPeloCompartilhamento` ADD CONSTRAINT `_treinosCriadosPeloCompartilhamento_B_fkey` FOREIGN KEY (`B`) REFERENCES `treinoCompartilhado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
