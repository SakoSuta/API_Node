/*
  Warnings:

  - You are about to drop the column `categoryId` on the `game` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Game_categoryId_fkey` ON `game`;

-- AlterTable
ALTER TABLE `game` DROP COLUMN `categoryId`;
