from flask import Flask,Response, render_template
from flask_cors import CORS, cross_origin
import cv2
from ultralytics import YOLO
import time

app = Flask(__name__,template_folder='../template')
cors = CORS(app)

model=YOLO("/Users/karthikalladi/VSCODES/Server and ML model/train/weights/best.pt")
#model.predict(source=,show=True,save=True, conf=0.7)
items = {0: 'CloseUp', 1: 'Cocoa Powder', 2: 'Colgate', 3: 'Hershey-s', 4: 'KeraGlo', 5: 'Lays', 6: 'Loreal', 7: 'Maggi', 8: 'MarieLight', 9: 'Perk'}
products = []

cap = cv2.VideoCapture(0)

def gen_frames():
    while True:
        success, frame = cap.read()
        if success:
            results = model(frame, show=False, conf=0.85, hide_labels=True)
            annotated_frame = results[0].plot(show_conf=False, line_thickness=10)
            product = results[0].boxes.cls.tolist()
            for i in range(0,len(product)):
                decision = input("Is this "+items[product[i]]+"?Y/n ")
                if decision == 'y' or decision=='Y':
                    if len(product) != 0:
                        products.append(items[product[i]])
            print(products)

            #cv2.imshow("YOLOv8 Inference", annotated_frame)
            ret, buffer = cv2.imencode('.jpg', annotated_frame)
            annotated_frame = buffer.tobytes()
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + annotated_frame + b'\r\n')
        else:
            cap.release()
    #cap.release()
    #cv2.destroyAllWindows()

@app.route("/", methods=['GET'])
def index():
    return render_template('home.html')

@app.route("/video_feed", methods=['GET'])
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True)
