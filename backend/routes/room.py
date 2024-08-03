from flask import Blueprint


blueprint = Blueprint()

@blueprint.route("/<string:room_id>", methods=["GET"])
def get_room(room_id):
    pass

@blueprint.route("/", methods=["POST"])
def create_room(room_id):
    pass

@blueprint.route("/<string:room_id>", methods=["POST"])
def join_room(room_id):
    pass

