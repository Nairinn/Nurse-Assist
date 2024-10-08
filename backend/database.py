import mysql.connector
from flask import request, jsonify

DB_CONFIG = {
    'host': 'localhost',
    'user': 'tester',
    'password': 'Sunh@ck5',
    'database': 'patient_data'
}

def insert_data(temp, heart_rate, spo2):
    db = mysql.connector.connect(**DB_CONFIG)
    cursor = db.cursor()

    if temp != 0.0 and heart_rate != 0 and spo2 != 0:
        sql = "INSERT INTO sensor_data (temperature, heart_rate, blood_oxygen) VALUES (%s, %s, %s)"
        cursor.execute(sql, (temp, heart_rate, spo2))
        db.commit()
    
    cursor.execute("DELETE FROM sensor_data WHERE id NOT IN (SELECT id FROM (SELECT id FROM sensor_data ORDER BY id DESC LIMIT 600) AS t)")
    db.commit() 

    cursor.close()
    db.close()

def get_recent_data(limit=600):
    db = mysql.connector.connect(**DB_CONFIG)
    cursor = db.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM sensor_data ORDER BY id DESC LIMIT %s", (limit,))

    data = cursor.fetchall()
    
    cursor.close()
    db.close()
    
    return data

def get_current_data():
    db = mysql.connector.connect(**DB_CONFIG)
    cursor = db.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1")

    data = cursor.fetchall()
    
    cursor.close()
    db.close()
    
    return data

def get_average_data():
    db = mysql.connector.connect(**DB_CONFIG)
    cursor = db.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM sensor_data ORDER BY id DESC LIMIT 600")

    data = cursor.fetchall()

    sumTemp = 0
    sumHR = 0
    sumSPO2 = 0

    for i in data:
        sumTemp += i["temperature"]
        sumHR += i["heart_rate"]
        sumSPO2 += i["blood_oxygen"]
    
    avgTemp = round(sumTemp/min(len(data),600),2)
    avgHR = round(sumHR/min(len(data),600),2)
    avgSPO2 = round(sumSPO2/min(len(data),600),2)
    
    cursor.close()
    db.close()
    
    return [avgTemp,avgHR,avgSPO2]

def get_week_sleep_log(limit=7):
    db = mysql.connector.connect(**DB_CONFIG)
    cursor = db.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM sleep_data ORDER BY id DESC LIMIT %s", (limit,))

    data = cursor.fetchall()
    
    cursor.close()
    db.close()
    
    return data

def add_patient_to_db(name, priority_level, heart_rate=None, blood_oxygen=None, temperature=None):
    try:
        db = mysql.connector.connect(**DB_CONFIG)
        cursor = db.cursor()
        query = """
        INSERT INTO patients (name, priority_level, heart_rate, blood_oxygen, temperature)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (name, priority_level, heart_rate, blood_oxygen, temperature))

        db.commit()

        cursor.close()
        db.close()

    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        raise
    
def update_sensor_data_in_db(patient_id, heart_rate, blood_oxygen, temperature):
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()
        cursor.execute(
            """
            UPDATE patients 
            SET heart_rate = %s, blood_oxygen = %s, temperature = %s, `timestamp` = NOW() 
            WHERE id = %s
            """,
            (heart_rate, blood_oxygen, temperature, patient_id)
        )
        connection.commit()

    except mysql.connector.Error as err:
        print(f"Error: {err}") 

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

@app.route('/insert-data', methods=['POST'])
def insert_sensor_data():
    data = request.get_json()
    temperature = data.get('temperature')
    heart_rate = data.get('heart_rate')
    blood_oxygen = data.get('blood_oxygen')

    insert_data(temperature, heart_rate, blood_oxygen)

    return jsonify({'message': 'Data inserted successfully!'}), 201