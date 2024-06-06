/*
  Warnings:

  - You are about to drop the column `musculo_treinado` on the `treinoRealizado` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `treinoRealizado` DROP COLUMN `musculo_treinado`;

-- RenameIndex
ALTER TABLE `treinoCompartilhado` RENAME INDEX `treinoCompartilhado_treinoCompartilhadoId_fkey` TO `treinoCompartilhado_treinoCompartilhadoId_idx`;
