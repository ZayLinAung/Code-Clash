from flask import Flask
from models import init_app
from routes.room import blueprint as RoomRoute
from routes.problem import blueprint as ProblemRoute

app = Flask(__name__)

app.config['MONGODB_URL'] = "mongodb://localhost:27017"

init_app(app)

app.register_blueprint(RoomRoute, url_prefix='/room')
app.register_blueprint(ProblemRoute, url_prefix='/problem')

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
