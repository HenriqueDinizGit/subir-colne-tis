/*
  Warnings:

  - You are about to drop the `fotoTreino` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `foto` to the `treinoRealizado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `treinoRealizado` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `fotoTreino` DROP FOREIGN KEY `fotoTreino_treinoId_fkey`;

-- AlterTable
ALTER TABLE `treino` ADD COLUMN `foto` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `treinoRealizado` ADD COLUMN `comunidadeId` INTEGER NULL,
    ADD COLUMN `foto` VARCHAR(191) NOT NULL,
    ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- DropTable
DROP TABLE `fotoTreino`;

-- CreateTable
CREATE TABLE `Comunidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `qntMembros` INTEGER NOT NULL DEFAULT 0,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Comunidade_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MembrosDaComunidade` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MembrosDaComunidade_AB_unique`(`A`, `B`),
    INDEX `_MembrosDaComunidade_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `treinoRealizado` ADD CONSTRAINT `treinoRealizado_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treinoRealizado` ADD CONSTRAINT `treinoRealizado_comunidadeId_fkey` FOREIGN KEY (`comunidadeId`) REFERENCES `Comunidade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comunidade` ADD CONSTRAINT `Comunidade_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MembrosDaComunidade` ADD CONSTRAINT `_MembrosDaComunidade_A_fkey` FOREIGN KEY (`A`) REFERENCES `Comunidade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MembrosDaComunidade` ADD CONSTRAINT `_MembrosDaComunidade_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
