from flask import Blueprint, request, jsonify
from flask_socketio import emit, join_room
from models.room import Room
# from app import socketio

blueprint = Blueprint('room_routes', __name__)

@blueprint.route("/<string:room_id>", methods=["GET"])
def get_room(room_id):
    room = Room(_id=room_id)
    return jsonify({"data": room.to_serializable_dict()}), 200

@blueprint.route("/", methods=["POST"])
def create_room():
    userId = request.json['userId']
    newRoom = Room(owner=userId)
    newRoom.save()
    join_room(newRoom.id)
    return jsonify({"data": newRoom.to_serializable_dict()}), 201

# this -> socket update
@blueprint.route("/join/<string:room_id>", methods=["POST"])
def join_room(room_id):
    try:
        opponentId = request.json['opponentId']
        room = Room.objects(id=room_id).first()
        Room.update(room, {"opponent": opponentId})
        join_room(room.id)
        emit('room:joined', {"opponent": opponentId}, to=room.id)
        return jsonify({"data": room.to_serializable_dict()}), 201
    except:
        return "Room not found", 401
