-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ANNUAL', 'MONTHLY', 'WEEKLY');

-- CreateTable
CREATE TABLE "ReadingChallenge" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "Type" NOT NULL,
    "numOfBooks" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,

    CONSTRAINT "ReadingChallenge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadingChallenge" ADD CONSTRAINT "ReadingChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
