/*
  Warnings:

  - Added the required column `descricao` to the `treinoRealizado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `treinoRealizado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `treinoRealizado` ADD COLUMN `descricao` VARCHAR(191) NOT NULL,
    ADD COLUMN `titulo` VARCHAR(191) NOT NULL;
