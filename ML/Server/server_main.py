from flask import Flask, Response, render_template, request, jsonify, url_for, redirect
#from flask import current_app as app
from flask_cors import CORS, cross_origin
import cv2
import base64
from ultralytics import YOLO
import time

app = Flask(__name__,template_folder='../template')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#app.app_context().push()

items = {0: 'CloseUp', 1: 'Cocoa Powder', 2: 'Colgate', 3: 'Hershey-s', 4: 'KeraGlo', 5: 'Lays', 6: 'Loreal', 7: 'Maggi', 8: 'MarieLight', 9: 'Perk'}

id_dict = {'CloseUp': 'hdsbi78dfY', 'Cocoa Powder': 'kahv238923', 'Maggi': 'jhdvsDjh3f', 'Hershey-s': 'kjbw23jhvh', 'KeraGlo': 'JHVgcYVj67', 'Lays': 'Ftuc88cUTI', 'Loreal': 'hvIViV89yv', 'Maggi': 'UC8u8cY8vi', 'MarieLight': 'iyv9779v97', 'Perk': 'iyvI9v9V76'}

model=YOLO("C:\\Users\\Harsha\\retail-billing-system\\runs\\detect\\train\\weights\\best.pt")

def gen_frames():
    detected_prod = 'None'
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if success:
            results = model(frame, show=False, conf=0.85, hide_labels=True)
            annotated_frame = results[0].plot(show_conf=False, line_thickness=10)
            product = results[0].boxes.cls.tolist()
            if product:
                #app.test_client().post('http://localhost:5000/product-name', data=items[product[0]])
                #time.sleep(3)
                #detected_prod = str(items[product[0]])
                return items[product[0]]
                #yield redirect('http://localhost:3000/')
            annotated_frame = cv2.resize(annotated_frame, (780, 400))
            ret, buffer = cv2.imencode('.jpg', annotated_frame)
            #annotated_frame = buffer.tobytes()
            #encoded_image = (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + annotated_frame + b'\r\n')
            #frame_data = base64.b64encode(buffer).decode('utf-8')
            #product_message = {'detected_product': detected_prod}
            #yield jsonify({'product': product_message,'frame': frame_data})
        else:
            cap.release()
            cv2.destroyAllWindows()

def annotate():
    while True:
        frame = request.files
        if frame:
            results = model(frame, show=False, conf=0.85, hide_labels=True)
            annotated_frame = results[0].plot(show_conf=False, line_thickness=10)
            product = results[0].boxes.cls.tolist()
            if product:
                time.sleep(1)
                """decision = input("Is this "+items[product[0]]+"?Y/n ")
                if decision == 'y' or decision=='Y':
                    products.append(items[product[0]])
                print(products)"""
            flag, buffer = cv2.imencode('.jpg', annotated_frame)
            annotated_frame = buffer.tobytes()
            return (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + annotated_frame + b'\r\n')
        

@app.route("/", methods=['GET'])
@cross_origin()
def index():
    return render_template('home.html')

@app.route("/video-feed", methods=['GET'])
@cross_origin()
def video_feed():
    result = gen_frames()
    id = id_dict[result]
    if result:
        return redirect('http://localhost:3000/'+id)
    #return Response(gen_frames(), mimetype='application/json')

@app.route("/process-frames", methods=['POST'])
@cross_origin()
def process_frames():
    return Response(annotate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    #with app.app_context():
        app.run(debug=True)