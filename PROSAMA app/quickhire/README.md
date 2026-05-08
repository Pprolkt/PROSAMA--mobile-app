# QuickHire Sydney — Flask Web App

## Folder Structure
```
quickhire/
├── app.py               ← Python backend (run this)
├── requirements.txt     ← Python packages needed
└── templates/
    └── index.html       ← Full frontend UI
```

## Setup in PyCharm or VS Code

### Step 1 — Install Python packages
Open the terminal inside PyCharm/VSCode and run:
```
pip install -r requirements.txt
```

### Step 2 — Run the app
```
python app.py
```

### Step 3 — Open in browser
Go to:  http://127.0.0.1:5000

---

## Notes
- No database needed — data is stored in memory (resets on restart)
- Works in any modern browser
- To add a real database later, swap the in-memory lists for SQLite/PostgreSQL
