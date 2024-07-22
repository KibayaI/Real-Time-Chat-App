/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `VarChar(255)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `VarChar(50)`.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[users] DROP CONSTRAINT [users_email_key];

-- AlterTable
ALTER TABLE [dbo].[users] ALTER COLUMN [password] VARCHAR(255) NOT NULL;
ALTER TABLE [dbo].[users] ALTER COLUMN [email] VARCHAR(50) NOT NULL;
ALTER TABLE [dbo].[users] DROP COLUMN [name];
ALTER TABLE [dbo].[users] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[updatedAt] DATETIME2 NOT NULL,
[username] VARCHAR(20) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[messages] (
    [id] NVARCHAR(1000) NOT NULL,
    [text] NVARCHAR(1000) NOT NULL,
    [senderId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [messages_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [messages_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[message_users] (
    [messageId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [message_users_pkey] PRIMARY KEY CLUSTERED ([messageId],[userId])
);

-- CreateIndex
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email]);

-- CreateIndex
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_username_key] UNIQUE NONCLUSTERED ([username]);

-- AddForeignKey
ALTER TABLE [dbo].[messages] ADD CONSTRAINT [messages_senderId_fkey] FOREIGN KEY ([senderId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[message_users] ADD CONSTRAINT [message_users_messageId_fkey] FOREIGN KEY ([messageId]) REFERENCES [dbo].[messages]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[message_users] ADD CONSTRAINT [message_users_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
