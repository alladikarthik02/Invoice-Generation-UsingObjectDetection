from flask import Flask, Response, render_template, request, redirect, url_for
from flask_cors import CORS, cross_origin
import cv2
from ultralytics import YOLO
import time
from flask_socketio import SocketIO, emit

app = Flask(__name__, template_folder='../template')
socketio = SocketIO(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

model = YOLO("/Users/karthikalladi/VSCODES/Server and ML model/train/weights/best.pt")
items = {0: 'CloseUp', 1: 'Cocoa Powder', 2: 'Colgate', 3: 'Hershey-s',
         4: 'KeraGlo', 5: 'Lays', 6: 'Loreal', 7: 'Maggi', 8: 'MarieLight', 9: 'Perk'}


def gen_frames():
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if success:
            results = model(frame, show=False, conf=0.85, hide_labels=True)
            annotated_frame = results[0].plot(show_conf=False)
            product = results[0].boxes.cls.tolist()
            if product:
                time.sleep(10)
                return redirect(url_for('product_name', prod=items[product[0]]))

            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        else:
            cap.release()
            cv2.destroyAllWindows()


@app.route("/", methods=['GET'])
@cross_origin()
def index():
    return render_template('home.html')


@app.route("/video-feed", methods=['GET'])
@cross_origin()
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route("/product-name", methods=['GET'])
@cross_origin()
def product_name():
    prod = request.args.get('prod')
    return f"The detected product is: {prod}"


if __name__ == "__main__":
    socketio.run(app, debug=True)
