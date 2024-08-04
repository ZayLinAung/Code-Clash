<<<<<<< HEAD
from flask import Flask, jsonify, request
from flask_cors import CORS
=======
from flask import Flask
from flask_socketio import SocketIO, emit
>>>>>>> f4aa8aa7993972ee89ca762b966d21d074792b37

socketio = SocketIO(cors_allowed_origins=["http://localhost:3000"])

<<<<<<< HEAD
CORS(app)

=======
def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = "the random string"
    app.config['MONGODB_URL'] = "mongodb://localhost:27017"

    from models import init_app
    from routes.room import blueprint as RoomRoute
    from routes.problem import blueprint as ProblemRoute
    #import events
>>>>>>> f4aa8aa7993972ee89ca762b966d21d074792b37

    init_app(app)
    app.register_blueprint(RoomRoute, url_prefix='/room')
    app.register_blueprint(ProblemRoute, url_prefix='/problem')
    socketio.init_app(app)
    return app

<<<<<<< HEAD
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
=======
@socketio.on('message')
def handle_message(msg):
    print('Message: ' + msg)
    emit('message', msg, broadcast=True)


# @socketio.on('room:join')
# def join_room():
#     pass

# @socketio.on('room:start')
# def start_room():
#     pass
app = create_app()
if __name__ == '__main__':
    socketio.run(app, debug=True)
    #.run(debug=True)
>>>>>>> f4aa8aa7993972ee89ca762b966d21d074792b37
