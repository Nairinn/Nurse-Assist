import os
import glob
import time
from flask import Flask, jsonify
from smbus2 import SMBus

app = Flask(__name__)

# 1-wire Temperature sensor setup
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')
base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]  # Adjust this if there are multiple devices
device_file = device_folder + '/w1_slave'

def read_temp_raw():
    """Read raw temperature data from the sensor."""
    with open(device_file, 'r') as f:
        lines = f.readlines()
    return lines

def read_temp():
    """Parse temperature from the raw data."""
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    temp_output = lines[1].split(' ')[9]
    temp_c = float(temp_output[2:]) / 1000.0  # Convert to Celsius
    return temp_c

# I2C MAX30102 sensor setup
MAX30102_ADDRESS = 0x57  # I2C address for MAX30102
bus = SMBus(1)  # I2C bus 1 on Raspberry Pi

def read_max30102():
    """Read data from the MAX30102 sensor."""
    try:
        # Example register addresses (check MAX30102 datasheet)
        red_reg = 0x09  # You may need to verify these registers
        ir_reg = 0x0A

        # Read 2 bytes from both red and IR registers
        red = bus.read_word_data(MAX30102_ADDRESS, red_reg)
        ir = bus.read_word_data(MAX30102_ADDRESS, ir_reg)

        return red, ir
    except Exception as e:
        print(f"Error reading MAX30102 sensor: {e}")
        return None, None

@app.route('/sensor-data', methods=['GET'])
def get_sensor_data():
    """Return sensor data as a JSON response."""
    # Reading from temperature sensor
    temp = read_temp()
    
    # Reading from MAX30102 sensor
    red, ir = read_max30102()
    
    if red is None or ir is None:
        return jsonify({
            'error': 'Failed to read from MAX30102 sensor'
        }), 500

    return jsonify({
        'temperature': temp,
        'red_led': red,
        'ir_led': ir
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
