import serial
import time
import threading
import requests
import random
from setInterval import setInterval

def thread_function():
    global reading
    print("Sending data",reading)
    #requests.post("http://localhost:8000/item/tool/volume",json={'weight':weight},headers={'Content-Type': 'application/json'})


arduino = serial.Serial("COM3",timeout=0,baudrate=57600)
inter = setInterval(1.0, thread_function)

while True: 
    global reading
    reading = str(arduino.readline().decode('UTF-8'))



    

