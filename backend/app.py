from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/room/', methods=['POST', 'OPTIONS'])
def create_room():
    if request.method == 'OPTIONS':
        return '', 200
    user_id = request.json.get('userId')
    room_id = "some_generated_room_id"
    return jsonify({"message": "Room created successfully", "_id": room_id}), 201

@app.route('/room/join/<room_id>', methods=['POST', 'OPTIONS'])
def join_room(room_id):
    if request.method == 'OPTIONS':
        return '', 200
    opponent_id = request.json.get('opponentId')
    # Here you would typically add the opponent to the room
    return jsonify({"message": "Joined room successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)