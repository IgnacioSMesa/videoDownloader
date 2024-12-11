from flask import Blueprint, request, jsonify
from model.UserModel import UserModel
from routes.Response import Response
import os
import jwt 
import datetime
import bcrypt

user_bp = Blueprint('user_bp', __name__)
model = UserModel()


SECRET_KEY = os.getenv('SECRET_KEY')

@user_bp.route('/api/users', methods=['GET'])
def getAllUsers():
    users = model.getUsers()
    return jsonify(users)

@user_bp.route('/api/insert', methods=['POST'])
def insertUser():
    response = Response()
    try:
        data = request.get_json()
        # Verificar que 'data' sea un diccionario y que tenga todas las claves necesarias
        if not data or not all(key in data for key in ("name", "lastname", "email", "paswd")):
            return response.error("Invalid data format", 400)
        
        name = data.get('name')
        lastname = data.get('lastname')
        email = data.get('email')
        paswd = data.get('paswd')
        hashed_password = hash_password(paswd)
        
        
        users = model.createUser(name, lastname, email, hashed_password)
        token = jwt.encode({
            'sub' : email,
            'name' : name,
            'lastname' : lastname,
            'iat' : datetime.datetime.utcnow(),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)

        },SECRET_KEY, algorithm="HS256")


        return response.success({"message": "Data received successfully", "token": token})
    except Exception as e:
        print(f"Error en la petición: {e}")
        return response.error(f"Internal server error: {e}")

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt) 
    return hashed_password
