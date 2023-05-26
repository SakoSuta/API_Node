/*
  Warnings:

  - You are about to alter the column `price` on the `plan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `plan` MODIFY `price` DOUBLE NOT NULL;
