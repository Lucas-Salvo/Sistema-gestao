-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefas" (
    "id" SERIAL NOT NULL,
    "descrição" TEXT NOT NULL,
    "prazo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gerenciamento" (
    "id" SERIAL NOT NULL,
    "usuariosId" INTEGER NOT NULL,
    "tarefaId" INTEGER NOT NULL,

    CONSTRAINT "Gerenciamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_cpf_key" ON "Usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Gerenciamento_usuariosId_key" ON "Gerenciamento"("usuariosId");

-- CreateIndex
CREATE UNIQUE INDEX "Gerenciamento_tarefaId_key" ON "Gerenciamento"("tarefaId");

-- AddForeignKey
ALTER TABLE "Gerenciamento" ADD CONSTRAINT "Gerenciamento_usuariosId_fkey" FOREIGN KEY ("usuariosId") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gerenciamento" ADD CONSTRAINT "Gerenciamento_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "Tarefas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
