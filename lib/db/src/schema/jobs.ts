import { pgTable, text, serial, real, integer, timestamp }
  from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
 
export const jobsTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  employer: text("employer").notNull(),
  avatar: text("avatar").notNull(),
  date: text("date").notNull(),
  budget: text("budget").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  rating: real("rating").notNull().default(5.0),
  reviews: integer("reviews").notNull().default(0),
  posted: text("posted").notNull().default("just now"),
  createdAt: timestamp("created_at").defaultNow(),
});
 
export const insertJobSchema = createInsertSchema(jobsTable)
  .omit({ id: true, createdAt: true });
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobsTable.$inferSelect;
