from flask import Blueprint, request, jsonify
from model.UserModel import UserModel
user_bp = Blueprint('user_bp', __name__)
model = UserModel()

@user_bp.route('/api/users', methods=['GET'])
def getAllUsers():
    users = model.getUsers();
    return jsonify(users)
