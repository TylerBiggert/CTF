# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file first (to leverage Docker's caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

# Initialize the SQLite database
RUN python init_db.py

# Expose port 5000
EXPOSE 5000

# Run the application
CMD ["python", "main.py"]
