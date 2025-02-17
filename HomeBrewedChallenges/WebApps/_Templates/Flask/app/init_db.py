import sqlite3

DB_FILE = "database.db"

# Connect to the database (it creates the file if it doesn't exist)
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# Create the "items" table
cursor.execute("""
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
""")

# Insert sample data (only if the table is empty)
cursor.execute("SELECT COUNT(*) FROM items")
if cursor.fetchone()[0] == 0:
    cursor.executemany("INSERT INTO items (name) VALUES (?)", [("Item 1",), ("Item 2",), ("Item 3",)])

# Commit and close the connection
conn.commit()
conn.close()

print("Database initialized successfully.")
