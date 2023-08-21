/*
  Warnings:

  - You are about to drop the column `text` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "text";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullname" TEXT NOT NULL;
