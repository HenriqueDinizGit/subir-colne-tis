/*
  Warnings:

  - You are about to drop the column `comunidadeId` on the `treinoRealizado` table. All the data in the column will be lost.
  - You are about to drop the column `dia_semana` on the `treinoRealizado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `treinoRealizado` DROP FOREIGN KEY `treinoRealizado_comunidadeId_fkey`;

-- AlterTable
ALTER TABLE `treinoRealizado` DROP COLUMN `comunidadeId`,
    DROP COLUMN `dia_semana`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
