/*
  Warnings:

  - You are about to drop the column `numOfbooks` on the `List` table. All the data in the column will be lost.
  - Added the required column `numOfBooks` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReadingChallenge" DROP CONSTRAINT "ReadingChallenge_userId_fkey";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "numOfbooks",
ADD COLUMN     "numOfBooks" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ReadingChallenge" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReadingChallenge" ADD CONSTRAINT "ReadingChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
