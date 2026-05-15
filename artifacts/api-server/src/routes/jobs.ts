import { Router } from "express";
import { db, jobsTable } from "@workspace/db";
import { CreateJobBody, ListJobsQueryParams } from "@workspace/api-zod";
import { eq } from "drizzle-orm";
 
const router = Router();
 
router.get("/jobs/stats", async (req, res) => {
  const allJobs = await db.select().from(jobsTable);
  const categoryMap: Record<string, number> = {};
  let totalBudget = 0, budgetCount = 0;
  for (const job of allJobs) {
    categoryMap[job.category] = (categoryMap[job.category] ?? 0) + 1;
    const parsed = parseFloat(job.budget.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsed)) { totalBudget += parsed; budgetCount++; }
  }
  const byCategory = Object.entries(categoryMap)
    .map(([category, count]) => ({ category, count }));
  const avgBudget = budgetCount > 0 ? Math.round(totalBudget / budgetCount) : 0;
  res.json({ total: allJobs.length, byCategory, avgBudget });
});
 
router.get("/jobs", async (req, res) => {
  const parsed = ListJobsQueryParams.safeParse(req.query);
  const category = parsed.success ? parsed.data.category : undefined;
  const jobs = category && category !== "All"
    ? await db.select().from(jobsTable).where(eq(jobsTable.category, category))
    : await db.select().from(jobsTable);
  res.json(jobs);
});
 
router.get("/jobs/:jobId", async (req, res) => {
  const jobId = parseInt(req.params.jobId, 10);
  if (isNaN(jobId)) return res.status(400).json({ error: "invalid_id" });
  const [job] = await db.select().from(jobsTable)
    .where(eq(jobsTable.id, jobId));
  if (!job) return res.status(404).json({ error: "not_found" });
  res.json(job);
});
 
router.post("/jobs", async (req, res) => {
  if (!req.session.loggedIn)
    return res.status(401).json({ error: "not_logged_in" });
  const parsed = CreateJobBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
  const [job] = await db.insert(jobsTable).values({
    ...parsed.data,
    employer: req.session.userName ?? "User",
    avatar: (req.session.userName ?? "US").slice(0, 2).toUpperCase(),
    rating: 5.0, reviews: 0, posted: "just now",
  }).returning();
  res.status(201).json(job);
});
 
export default router;
