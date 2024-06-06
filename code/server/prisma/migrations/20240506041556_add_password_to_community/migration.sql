-- AlterTable
ALTER TABLE `Comunidade` ADD COLUMN `isPublic` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `password` VARCHAR(191) NULL;
