/*
  Warnings:

  - Added the required column `from` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[messages] ADD [from] NVARCHAR(1000) NOT NULL,
[to] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
