/*
  Warnings:

  - Added the required column `description` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developpement` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edition` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `game` ADD COLUMN `description` VARCHAR(1000) NOT NULL,
    ADD COLUMN `developpement` VARCHAR(191) NOT NULL,
    ADD COLUMN `edition` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;
