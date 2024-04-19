/*
  Warnings:

  - You are about to drop the column `numOfBooks` on the `Bookshelf` table. All the data in the column will be lost.
  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Bookshelf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privacy` to the `Bookshelf` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Privacy" AS ENUM ('PUBLIC', 'PRIVATE');

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BookToList" DROP CONSTRAINT "_BookToList_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToList" DROP CONSTRAINT "_BookToList_B_fkey";

-- AlterTable
ALTER TABLE "Bookshelf" DROP COLUMN "numOfBooks",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "privacy" "Privacy" NOT NULL;

-- DropTable
DROP TABLE "List";

-- DropTable
DROP TABLE "_BookToList";
