from flask import Blueprint, request, jsonify
from models.room import Room

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
    return jsonify({"data": newRoom.to_serializable_dict()}), 201

# this -> socket update
@blueprint.route("/join/<string:room_id>", methods=["POST"])
def join_room(room_id):
    try:
        opponentId = request.json['opponentId']
        room = Room.objects(id=room_id).first()
        Room.update(room, {"opponent": opponentId})
        return jsonify({"data": room.to_serializable_dict()}), 201
    except:
        return "Room not found", 401
