import cv2
import io
import os
from flask import Flask, Response
from flask_cors import CORS
import network_as_code as nac
from network_as_code.models.device import DeviceIpv4Addr
from network_as_code.models.slice import (
    Point,
    AreaOfService,
    NetworkIdentifier,
    SliceInfo,
    Throughput
)
from dotenv import load_dotenv

load_dotenv()

client = nac.NetworkAsCodeClient(
    token=os.getenv('TOKEN') # Your TOKEN from https://networkascode.nokia.io/developer/authorization/[YOUR_APP] 
)

my_device=client.devices.get(
    ipv4_address=DeviceIpv4Addr(
        public_address=os.getenv('IPV4'), # Your IPv4 address public == private
        private_address=os.getenv('IPV4'),# Your IPv4 address public == private
    ),
    phone_number=os.getenv('PHONE_NUMBER'),# Your 5G Network Device's Phone Number
)

qos_session = True
if (qos_session):
    my_session=my_device.create_qod_session(
        service_ipv4=os.getenv('IPV4'), # Your IPv4 address public == private
        profile="QOS_L_ONLYMAX", # Maximazing low latency
        duration=3600,
    )
    print('QOS_SESSION RUN!')

my_device.clear_sessions()

app = Flask(__name__)
CORS(app)

def generate_frames():
    cap = cv2.VideoCapture(0)  # Open the default webcam
    while True:
        success, frame = cap.read()  # Capture frame-by-frame
        if not success:
            break

        # Encode the frame in JPEG format
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            continue

        # Convert the buffer to bytes and yield it
        stream = io.BytesIO(buffer)
        stream.seek(0)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + stream.read() + b'\r\n')
        stream.truncate()
    cap.release()  # Release the webcam

@app.route('/video_feed', methods=['GET'])
def video_feed():
    frames_response = Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
    return frames_response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)