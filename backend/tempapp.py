import os
import glob
import time
import random
from flask import Flask, jsonify, request
from threading import Thread  
from database import update_sensor_data_in_db
from flask_cors import CORS
import mysql.connector

DB_CONFIG = {
    'host': 'localhost',
    'user': 'tester',
    'password': 'Sunh@ck5',
    'database': 'patient_data'
}


app = Flask(__name__)
CORS(app)
#os.system('modprobe w1-gpio')
#os.system('modprobe w1-therm')
#base_dir = '/sys/bus/w1/devices/'
#device_folder = glob.glob(base_dir + '28*')[0]
#device_file = device_folder + '/w1_slave'

def mock_read_temp():
    return random.uniform(30, 40)

def mock_read_heart_rate():
    return random.randint(60, 100)

def mock_read_spo2():
    return random.randint(90, 100)

def get_all_patient_ids():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()

        cursor.execute("SELECT id FROM patients")
        patient_ids = [row[0] for row in cursor.fetchall()]

        return patient_ids 

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return []

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def collect_data():
    while False:

        patient_ids = get_all_patient_ids() 

        for patient_id in patient_ids:
            temp = mock_read_temp()
            heart_rate = mock_read_heart_rate()
            spo2 = mock_read_spo2()
            update_sensor_data_in_db(patient_id, heart_rate, spo2, temp)

        time.sleep(1) 

@app.route('/addPatient', methods=['POST'])
def add_patient():
    data = request.get_json()
    name = data.get('name')
    priority_level = data.get('priority_level')

    heart_rate = None
    blood_oxygen = None
    temperature = None

    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()

        cursor.execute(
            "INSERT INTO patients (name, priority_level, heart_rate, blood_oxygen, temperature) VALUES (%s, %s, %s, %s, %s)",
            (name, priority_level, heart_rate, blood_oxygen, temperature)
        )
        connection.commit()

        return jsonify({"message": "Patient added successfully"}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


@app.route('/patients', methods=['GET'])
def get_patients():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM patients")
        rows = cursor.fetchall()

        patients = [
            {
                "id": row[0],
                "name": row[1],
                "priority_level": row[2],
                "heart_rate": row[3],
                "blood_oxygen": row[4],
                "temperature": row[5],
                "timestamp": row[6],
            }
            for row in rows
        ]

        return jsonify(patients), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

@app.route('/updatePatientPriority/<int:patient_id>', methods=['POST'])
def update_patient_priority(patient_id):
    data = request.get_json()
    priority_level = data.get('priority_level')

    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()

        cursor.execute(
            "UPDATE patients SET priority_level = %s, timestamp = CURRENT_TIMESTAMP WHERE id = %s",
            (priority_level, patient_id)
        )
        connection.commit()

        return jsonify({"message": "Patient priority updated successfully"}), 200

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

@app.route('/updateVitals/<int:patient_id>', methods=['POST'])
def update_vitals(patient_id):
    start_time = time.time()
    
    while time.time() - start_time < 10:
        temp = mock_read_temp()
        heart_rate = mock_read_heart_rate()
        spo2 = mock_read_spo2()

        update_sensor_data_in_db(patient_id, heart_rate, spo2, temp)
        time.sleep(1)  

    return jsonify({"message": "Patient vitals updated successfully"}), 200

@app.route('/deletePatient/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()

        cursor.execute("DELETE FROM patients WHERE id = %s", (patient_id,))
        connection.commit()

        return jsonify({"message": "Patient deleted successfully"}), 200

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

if __name__ == '__main__':
    data_thread = Thread(target=collect_data)
    data_thread.daemon = True  
    data_thread.start()

    app.run(host='0.0.0.0', port=5000)

