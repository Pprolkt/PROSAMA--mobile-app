import { Router } from "express";
import { db, messagesTable } from "@workspace/db";
import { SendMessageBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";
 
const router = Router();
 
router.get("/messages/:jobId", async (req, res) => {
  const jobId = parseInt(req.params.jobId, 10);
  if (isNaN(jobId)) return res.status(400).json({ error: "invalid_id" });
  const messages = await db.select().from(messagesTable)
    .where(eq(messagesTable.jobId, jobId));
  res.json(messages);
});
 
router.post("/messages", async (req, res) => {

  const parsed = SendMessageBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
  const { jobId, text } = parsed.data;
  if (!text.trim()) return res.status(400).json({ error: "empty" });
  const time = new Date().toLocaleTimeString("en-AU",
    { hour: "2-digit", minute: "2-digit" });
  const [msg] = await db.insert(messagesTable)
    .values({ jobId, fromUser: "me", text: text.trim(), time })
    .returning();
  res.json({ fromUser: msg.fromUser, text: msg.text, time: msg.time });
});
 
export default router;
