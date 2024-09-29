import os
import glob
import time
import random
import requests
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

RASPBERRY_PI_IP = "192.168.1.100"  # Replace with the actual IP address of your Raspberry Pi
RASPBERRY_PI_PORT = 5000

app = Flask(__name__)
CORS(app)

def get_raspberry_pi_data():
    """Fetch sensor data from Raspberry Pi"""
    try:
        response = requests.get(f'http://172.20.10.10:5000/sensor-data')
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to fetch data from Raspberry Pi. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None

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
            # Fetch data from Raspberry Pi
            pi_data = get_raspberry_pi_data()

            if pi_data:
                temp = pi_data['temperature_c']
                heart_rate = pi_data['red_led']  # Assuming red LED corresponds to heart rate
                spo2 = pi_data['ir_led']  # Assuming IR LED corresponds to SpO2

                # Update the database with the fetched data
                update_sensor_data_in_db(patient_id, heart_rate, spo2, temp)

        time.sleep(1)  # Sleep for 1 second before fetching data again

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
        # Fetch real sensor data from Raspberry Pi
        pi_data = get_raspberry_pi_data()

        if pi_data:
            temp = pi_data['temperature_c']
            heart_rate = pi_data['red_led']  # Assuming red LED corresponds to heart rate
            spo2 = pi_data['ir_led']  # Assuming IR LED corresponds to SpO2

            # Update the database with the fetched data
            update_sensor_data_in_db(patient_id, heart_rate, spo2, temp)

        time.sleep(1)  # Sleep for 1 second before next update

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
