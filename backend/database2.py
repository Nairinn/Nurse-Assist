from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

db_config = {
    'user': 'Chat',
    'password': 'Sunh@cks$!',
    'host': 'localhost',
    'database': 'SleepThing'
}

@app.route('/submitSleepData', methods=['POST'])
def submit_sleep_data():
    data = request.json
    sleep_time = data['sleep_time']
    wake_time = data['wake_time']

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    insert_query = "INSERT INTO sleep_data_table (sleep_time, wake_time) VALUES (%s, %s)"
    cursor.execute(insert_query, (sleep_time, wake_time))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'message': 'Sleep data submitted successfully!'}), 200

if __name__ == '__main__':
    app.run(port=5000)
