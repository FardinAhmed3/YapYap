# Official Python Image
FROM python:3

# Set the working directory inside the container
WORKDIR /app

# Copy backend files into the container
COPY . .

# Install all dependenceis 
RUN pip install -r requirements.txt

# Exposes FastAPI default port
EXPOSE 8000

# Run the application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]