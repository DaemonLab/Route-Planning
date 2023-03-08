import serial
import time
import requests



arduino = serial.Serial("COM3",timeout=0,baudrate=9600)

buffer = []

while True: 

    arduino.reset_input_buffer()
    if arduino.in_waiting:
        reading = str(arduino.readline().decode('UTF-8').strip())
        try:
            buffer.append(int(reading))
        except:
            pass
    

    if len(buffer)==100:
        weight = max(buffer)
        print("Weight ",weight)
        requests.post("http://localhost:8000/item/tool/weight",json={"weight":weight},headers={'Content-Type': 'application/json'})
        buffer = []
        time.sleep(1)
        for i in range(1000):
            arduino.reset_input_buffer()
            if arduino.in_waiting:
                reading = str(arduino.readline().decode('UTF-8').strip())
                try:
                    buffer.append(int(reading))
                except:
                    pass


    # time.sleep(0.1)

