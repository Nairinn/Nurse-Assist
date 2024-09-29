import requests
import pandas as pd

url = 'http://127.0.0.1:5000/sensorData'
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    df = pd.DataFrame(data)
    df.to_csv('sensor_data.csv', index=False)
    print("Data saved to sensor_data.csv")
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")
