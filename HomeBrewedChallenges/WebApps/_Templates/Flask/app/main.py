from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

def get_data():
    """Fetch data from the 'items' table in the database."""
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, name FROM items")
    data = cursor.fetchall()
    conn.close()
    return [{"id": row[0], "name": row[1]} for row in data]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/items")
def items():
    return jsonify(get_data())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
