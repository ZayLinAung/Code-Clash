from flask import Flask
from flask_socketio import SocketIO
from models import init_app
from routes.room import blueprint as RoomRoute
from routes.problem import blueprint as ProblemRoute

app = Flask(__name__)

app.config['SECRET_KEY'] = "the random string"
app.config['MONGODB_URL'] = "mongodb://localhost:27017"

init_app(app)
app.register_blueprint(RoomRoute, url_prefix='/room')
app.register_blueprint(ProblemRoute, url_prefix='/problem')
socketio = SocketIO(cors_allowed_origins=["http://localhost:3000"])
socketio.init_app(app)

@app.route('/')
def hello():
    return 'Hello, World!'

@socketio.on('room:join')
def join_room():
    pass

@socketio.on('room:start')
def start_room():
    pass

if __name__ == '__main__':
    
    socketio.run(app)
    #.run(debug=True)
