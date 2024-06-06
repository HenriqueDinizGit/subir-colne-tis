/*
  Warnings:

  - You are about to drop the column `createdAt` on the `treinoRealizado` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `treinoRealizado` DROP COLUMN `createdAt`,
    MODIFY `descricao` VARCHAR(191) NULL,
    MODIFY `titulo` VARCHAR(191) NULL;
