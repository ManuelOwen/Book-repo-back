import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, pgEnum, integer, varchar,boolean } from "drizzle-orm/pg-core";

export const BookTable = pgTable("BookTable", {
    id:serial("id").primaryKey(),
    Author:varchar("Author").notNull(),
    Tittle:varchar("Tttle").notNull(),
    year_published:varchar("year_published").notNull(),
    
});

export type TIBook = typeof BookTable.$inferInsert;
export type TSBook = typeof BookTable.$inferSelect;