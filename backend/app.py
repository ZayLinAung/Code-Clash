from flask import Flask
from flask_socketio import SocketIO, emit

socketio = SocketIO(cors_allowed_origins=["http://localhost:3000"])

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = "the random string"
    app.config['MONGODB_URL'] = "mongodb://localhost:27017"

    from models import init_app
    from routes.room import blueprint as RoomRoute
    from routes.problem import blueprint as ProblemRoute
    #import events

    init_app(app)
    app.register_blueprint(RoomRoute, url_prefix='/room')
    app.register_blueprint(ProblemRoute, url_prefix='/problem')
    socketio.init_app(app)
    return app

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
