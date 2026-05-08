from flask import Flask, render_template, request, jsonify, session
from datetime import datetime

app = Flask(__name__)
app.secret_key = "quickhire-sydney-2024"

# ── DATA ──────────────────────────────────────────────────
JOBS = [
    {"id": 1, "title": "Furniture Moving Help", "employer": "James R.", "avatar": "JR",
     "date": "Today, 2:00 PM", "budget": "$120", "location": "Surry Hills, NSW 2010",
     "description": "Need 2 people to help move furniture from a 1-bedroom apartment to a truck. Should take about 3 hours. Heavy lifting required.",
     "category": "Moving", "rating": 4.8, "reviews": 12, "posted": "10 min ago"},

    {"id": 2, "title": "Cafe Emergency Cover – Barista", "employer": "Luna Café", "avatar": "LC",
     "date": "Tomorrow, 7:00 AM", "budget": "$200", "location": "Newtown, NSW 2042",
     "description": "Our barista called in sick. Need someone with coffee experience for a full day shift. Busy inner-west café.",
     "category": "Hospitality", "rating": 4.6, "reviews": 28, "posted": "25 min ago"},

    {"id": 3, "title": "Grocery & Errand Run", "employer": "Sarah M.", "avatar": "SM",
     "date": "Today, 5:00 PM", "budget": "$60", "location": "Bondi, NSW 2026",
     "description": "Need someone to pick up groceries from Coles Bondi Junction + drop off a parcel at the post office. Car required.",
     "category": "Errands", "rating": 5.0, "reviews": 6, "posted": "1 hr ago"},

    {"id": 4, "title": "Event Setup – Tables & Chairs", "employer": "The Event Co.", "avatar": "TE",
     "date": "Sat, 8:00 AM", "budget": "$180", "location": "Alexandria, NSW 2015",
     "description": "Setting up for a weekend market. Need 3 people to arrange 80 tables and chairs in a warehouse space. Early start.",
     "category": "Events", "rating": 4.3, "reviews": 9, "posted": "3 hrs ago"},

    {"id": 5, "title": "Garden Clean-Up", "employer": "Mike T.", "avatar": "MT",
     "date": "Sun, 9:00 AM", "budget": "$90", "location": "Marrickville, NSW 2204",
     "description": "Backyard needs weeding, mowing and tidying. About 4 hours of work. Tools provided on-site.",
     "category": "Garden", "rating": 4.7, "reviews": 3, "posted": "5 hrs ago"},
]

MESSAGES = {
    1: [
        {"from_user": "them", "text": "Hi! Is the furniture moving job still available?", "time": "10:02 AM"},
        {"from_user": "me",   "text": "Yes it is! We need 2 people, starts at 2pm today.", "time": "10:05 AM"},
        {"from_user": "them", "text": "I'm available. Do we need to bring anything?",      "time": "10:06 AM"},
    ]
}

applied_jobs = []   # in-memory for demo
posted_jobs  = []


# ── ROUTES ────────────────────────────────────────────────
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/jobs")
def api_jobs():
    category = request.args.get("category", "All")
    filtered = JOBS + posted_jobs
    if category != "All":
        filtered = [j for j in filtered if j["category"] == category]
    return jsonify(filtered)

@app.route("/api/apply", methods=["POST"])
def api_apply():
    if not session.get("logged_in"):
        return jsonify({"error": "not_logged_in"}), 401
    job_id = request.get_json().get("job_id")
    if job_id not in applied_jobs:
        applied_jobs.append(job_id)
    return jsonify({"success": True, "applied": applied_jobs})

@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()
    session["logged_in"]  = True
    session["user_name"]  = data.get("name", "Sydney User")
    session["user_email"] = data.get("email", "")
    return jsonify({"success": True, "name": session["user_name"]})

@app.route("/api/logout", methods=["POST"])
def api_logout():
    session.clear()
    return jsonify({"success": True})

@app.route("/api/post_job", methods=["POST"])
def api_post_job():
    if not session.get("logged_in"):
        return jsonify({"error": "not_logged_in"}), 401
    data = request.get_json()
    new_job = {
        "id":          len(JOBS) + len(posted_jobs) + 1,
        "title":       data.get("title", ""),
        "employer":    session.get("user_name", "You"),
        "avatar":      session.get("user_name", "YO")[:2].upper(),
        "date":        data.get("date", ""),
        "budget":      data.get("budget", ""),
        "location":    data.get("location", "Sydney, NSW"),
        "description": data.get("description", ""),
        "category":    data.get("category", "Other"),
        "rating":      5.0, "reviews": 0, "posted": "just now",
    }
    posted_jobs.append(new_job)
    return jsonify({"success": True, "job": new_job})

@app.route("/api/messages/<int:job_id>")
def api_messages(job_id):
    return jsonify(MESSAGES.get(job_id, []))

@app.route("/api/send_message", methods=["POST"])
def api_send_message():
    data   = request.get_json()
    job_id = data.get("job_id")
    text   = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "empty"}), 400
    msg = {"from_user": "me", "text": text, "time": datetime.now().strftime("%I:%M %p")}
    MESSAGES.setdefault(job_id, []).append(msg)
    return jsonify({"success": True, "message": msg})

@app.route("/api/session")
def api_session():
    return jsonify({
        "logged_in": session.get("logged_in", False),
        "user_name": session.get("user_name", ""),
        "applied":   applied_jobs,
    })


if __name__ == "__main__":
    print("✅ QuickHire Sydney running → http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
