/*
  Warnings:

  - Added the required column `text` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "text" TEXT NOT NULL;
