-- CreateTable
CREATE TABLE "Password" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "dateModified" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "webName" TEXT NOT NULL,
    "webType" TEXT NOT NULL,
    "webUrl" TEXT NOT NULL,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);
