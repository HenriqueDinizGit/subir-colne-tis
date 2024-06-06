/*
  Warnings:

  - You are about to drop the column `treinosCriadosPeloCompartilhamento` on the `treinoCompartilhado` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `treinoCompartilhado` DROP COLUMN `treinosCriadosPeloCompartilhamento`;

-- CreateTable
CREATE TABLE `treinoCriadoPeloCompartilhamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `treinoCompartilhadoId` INTEGER NOT NULL,
    `treinoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `treinoCriadoPeloCompartilhamento` ADD CONSTRAINT `treinoCriadoPeloCompartilhamento_treinoCompartilhadoId_fkey` FOREIGN KEY (`treinoCompartilhadoId`) REFERENCES `treinoCompartilhado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treinoCriadoPeloCompartilhamento` ADD CONSTRAINT `treinoCriadoPeloCompartilhamento_treinoId_fkey` FOREIGN KEY (`treinoId`) REFERENCES `treino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
