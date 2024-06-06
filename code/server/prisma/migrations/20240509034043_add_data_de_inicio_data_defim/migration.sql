/*
  Warnings:

  - Added the required column `dataDeFim` to the `Comunidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataDeInicio` to the `Comunidade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comunidade` ADD COLUMN `dataDeFim` DATETIME(3) NOT NULL,
    ADD COLUMN `dataDeInicio` DATETIME(3) NOT NULL;

-- RenameIndex
ALTER TABLE `Comunidade` RENAME INDEX `Comunidade_adminId_fkey` TO `Comunidade_adminId_idx`;
