import { Router } from "express";
import { ApplyForJobBody } from "@workspace/api-zod";
 
const router = Router();
 
router.post("/apply", (req, res) => {
  if (!req.session.loggedIn)
    return res.status(401).json({ error: "not_logged_in" });
  const parsed = ApplyForJobBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
  const { jobId } = parsed.data;
  if (!req.session.applied) req.session.applied = [];
  if (!req.session.applied.includes(jobId)) req.session.applied.push(jobId);
  res.json({ success: true, applied: req.session.applied });
});
 
export default router;
