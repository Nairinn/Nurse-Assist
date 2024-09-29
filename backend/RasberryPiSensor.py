#!/usr/bin/env python3
import os
import time
from flask import Flask, jsonify
from smbus2 import SMBus

app = Flask(__name__)

def sensor():
    for i in os.listdir('/sys/bus/w1/devices'):
        if i != 'w1_bus_master1':
            return i

def read_temp(ds18b20):
    location = '/sys/bus/w1/devices/' + ds18b20 + '/w1_slave'
    with open(location) as tfile:
        text = tfile.read()
    secondline = text.split("\n")[1]
    temperaturedata = secondline.split(" ")[9]
    temperature = float(temperaturedata[2:])
    celsius = temperature / 1000
    fahrenheit = (celsius * 1.8) + 32
    return celsius, fahrenheit

MAX30102_ADDRESS = 0x57
bus = SMBus(1)

def read_max30102():
    """Read data from the MAX30102 sensor."""
    try:
        red_reg = 0x09
        ir_reg = 0x0A

        red = bus.read_word_data(MAX30102_ADDRESS, red_reg)
        ir = bus.read_word_data(MAX30102_ADDRESS, ir_reg)

        return red, ir
    except Exception as e:
        print(f"Error reading MAX30102 sensor: {e}")
        return None, None

@app.route('/sensor-data', methods=['GET'])
def get_sensor_data():
    """Return temperature and heart rate data as JSON."""
    try:
        serialNum = sensor()
        temp_c, temp_f = read_temp(serialNum)
        
        red, ir = read_max30102()
        
        if red is None or ir is None:
            return jsonify({'error': 'Failed to read from MAX30102 sensor'}), 500

        return jsonify({
            'temperature_c': temp_c,
            'temperature_f': temp_f,
            'red_led': red,
            'ir_led': ir
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 
