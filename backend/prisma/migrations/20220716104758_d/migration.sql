-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GAMER');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('JAVASCRIPT', 'REACT', 'NODE');

-- CreateEnum
CREATE TYPE "Correct" AS ENUM ('A', 'B', 'C', 'D');

-- CreateTable
CREATE TABLE "Gamers" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'GAMER',
    "name" VARCHAR(55) NOT NULL,
    "age" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Gamers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreBoard" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'JAVASCRIPT',
    "gamerId" INTEGER NOT NULL,
    "score" TEXT,

    CONSTRAINT "ScoreBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,
    "gamerId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    "C" TEXT NOT NULL,
    "D" TEXT NOT NULL,
    "correct" "Correct" NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gamers_email_key" ON "Gamers"("email");

-- AddForeignKey
ALTER TABLE "ScoreBoard" ADD CONSTRAINT "ScoreBoard_gamerId_fkey" FOREIGN KEY ("gamerId") REFERENCES "Gamers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_gamerId_fkey" FOREIGN KEY ("gamerId") REFERENCES "Gamers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
