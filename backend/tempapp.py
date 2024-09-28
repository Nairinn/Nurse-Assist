import os
import glob
import time
import random
from flask import Flask, jsonify
from threading import Thread  
from database import insert_data, get_recent_data, get_current_data, get_average_data

app = Flask(__name__)

#os.system('modprobe w1-gpio')
#os.system('modprobe w1-therm')
#base_dir = '/sys/bus/w1/devices/'
#device_folder = glob.glob(base_dir + '28*')[0]
#device_file = device_folder + '/w1_slave'

def mock_read_temp():
    return random.uniform(20.0, 30.0)

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

if __name__ == '__main__':
    data_thread = Thread(target=collect_data)
    data_thread.daemon = True  
    data_thread.start()

    app.run(host='0.0.0.0', port=5000)
