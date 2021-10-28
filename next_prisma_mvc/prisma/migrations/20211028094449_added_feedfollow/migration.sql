-- CreateTable
CREATE TABLE "FeedTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FeedFollow" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "feedId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "feedId"),
    CONSTRAINT "FeedFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FeedFollow_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FeedToFeedTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Feed" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "FeedTag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedTag_name_key" ON "FeedTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FeedToFeedTag_AB_unique" ON "_FeedToFeedTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedToFeedTag_B_index" ON "_FeedToFeedTag"("B");
