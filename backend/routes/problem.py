from flask import Blueprint, request, jsonify
from models.problem import Problem

blueprint = Blueprint('problem_routes', __name__)

@blueprint.route("/<string:problem_id>", methods=["GET"])
def get_problem(problem_id):
    problem = Problem(_id=problem_id)
    return jsonify({"data": problem.to_serializable_dict()}), 200


