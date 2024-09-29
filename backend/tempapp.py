import os
import glob
import time
import random
from flask import Flask, jsonify, request
from threading import Thread  
from database import insert_data, get_recent_data, get_current_data, get_average_data, get_week_sleep_log
from flask_cors import CORS
import mysql.connector

DB_CONFIG = {
    'host': 'localhost',
    'user': 'tester',
    'password': 'Sunh@ck5',
    'database': 'project1'
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

def collect_data():
    while True:
        temp = mock_read_temp()
        heart_rate = mock_read_heart_rate()
        spo2 = mock_read_spo2()
        
        insert_data(temp, heart_rate, spo2)
        time.sleep(1) 

@app.route('/sensorData', methods=['GET'])
def get_sensor_data():
    data = get_recent_data() 
    
    return jsonify(data)

@app.route('/currentData', methods=['GET'])
def get_current():
    data = get_current_data() 
    
    return jsonify(data)

@app.route('/averageData', methods=['GET'])
def get_average():
    data = get_average_data() 
    
    return jsonify(data)

@app.route('/submitSleepData', methods=['POST'])
def submit_sleep_data():
    data = request.json
    sleep_time = data.get('sleep_time')
    wake_time = data.get('wake_time')

    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    insert_query = "INSERT INTO sleep_data (sleep_time, wake_time) VALUES (%s, %s)"
    cursor.execute(insert_query, (sleep_time, wake_time))
    conn.commit()

    cursor.execute("DELETE FROM sleep_data WHERE id NOT IN (SELECT id FROM (SELECT id FROM sleep_data ORDER BY id DESC LIMIT 7) AS t)")
    conn.commit() 

    cursor.close()
    conn.close()

    return jsonify({'message': 'Sleep data submitted successfully!'}), 200

@app.route('/sleepLogWeek', methods=['GET'])
def get_week_log():
    data = get_week_sleep_log()
    
    return jsonify(data)

if __name__ == '__main__':
    data_thread = Thread(target=collect_data)
    data_thread.daemon = True  
    data_thread.start()

    app.run(host='0.0.0.0', port=5000)
