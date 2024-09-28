import mysql.connector

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'SQLr00tp@ssw0rd',
    'database': 'project'
}

def insert_data(temp, heart_rate, spo2):
    """Insert sensor data into the MySQL database and maintain only the 20 most recent records."""
    db = mysql.connector.connect(**DB_CONFIG)
    cursor = db.cursor()

    # Insert the new data
    sql = "INSERT INTO sensor_data (temperature, heart_rate, blood_oxygen) VALUES (%s, %s, %s)"
    cursor.execute(sql, (temp, heart_rate, spo2))
    
    db.commit()  # Commit the changes
    
    # Remove older records if there are more than 20
    cursor.execute("DELETE FROM sensor_data WHERE id NOT IN (SELECT id FROM (SELECT id FROM sensor_data ORDER BY id DESC LIMIT 20) AS t)")
    db.commit()  # Commit the deletion

    cursor.close()
    db.close()

def get_recent_data(limit=20):
    """Fetch the most recent sensor data from the MySQL database."""
    db = mysql.connector.connect(**DB_CONFIG)
    cursor = db.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM sensor_data ORDER BY id DESC LIMIT %s", (limit,))
    data = cursor.fetchall()
    
    cursor.close()
    db.close()
    
    return data
