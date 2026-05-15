import { Router } from "express";
import { LoginBody } from "@workspace/api-zod";
 
declare module "express-session" {
  interface SessionData {
    loggedIn?: boolean; userName?: string;
    userEmail?: string; applied?: number[];
  }
}
const router = Router();
 
router.get("/auth/session", (req, res) => {
  res.json({ loggedIn: req.session.loggedIn ?? false,
    userName: req.session.userName ?? "",
    applied: req.session.applied ?? [] });
});
 
router.post("/auth/login", (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
  const { name, email } = parsed.data;
  req.session.loggedIn = true;
  req.session.userName = name;
  req.session.userEmail = email;
  if (!req.session.applied) req.session.applied = [];
  res.json({ success: true, name });
});

 
router.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {});
  res.json({ success: true });
});
 
export default router;
