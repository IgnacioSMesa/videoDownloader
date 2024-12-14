from flask import Blueprint, request, jsonify, session
from model.UserModel import UserModel
from routes.Response import Response
import os
import jwt
import datetime
import bcrypt
from uuid import uuid4
from dotenv import load_dotenv

# Cargar las variables del archivo .env
load_dotenv()

# Obtener la clave secreta desde el archivo .env
SECRET_KEY = os.getenv('SECRET_KEY')

# Inicializar Blueprint y modelo
user_bp = Blueprint('user_bp', __name__)
model = UserModel()

# Función para generar un Access Token
def generate_access_token(email, password):
    return jwt.encode({
        'sub': email, 
        'password' : password,
        'iat': datetime.datetime.utcnow(), 
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60) 
    }, SECRET_KEY, algorithm="HS256")

# Función para hash de la contraseña
def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt) 
    return hashed_password

# Endpoint para obtener todos los usuarios
@user_bp.route('/api/users', methods=['GET'])
def getAllUsers():
    users = model.getUsers()
    return jsonify(users)

@user_bp.route('/api/insert', methods=['POST'])
def insertUser():
    response = Response()
    try:
        data = request.get_json()
    
        if not data or not all(key in data for key in ("name", "lastname", "email", "paswd")):
            print("Formato de datos inválido o faltan claves")
            return response.error("Invalid data format", 400)
        
        name = data.get('name')
        lastname = data.get('lastname')
        email = data.get('email')
        paswd = data.get('paswd')

        # Hash de la contraseña
        hashed_password = hash_password(paswd)

        # Crear el usuario en la base de datos
        users = model.createUser(name, lastname, email, hashed_password)

        # Crear un token al registrar un usuario
        token = jwt.encode({
            'sub': email,
            'name': name,
            'lastname': lastname,
            'iat': datetime.datetime.utcnow(),
        }, SECRET_KEY, algorithm="HS256")
        print(f"Token generado: {token}")

        return response.success({"message": "Data received successfully", "token": token})
    except Exception as e:
        print(f"Error en insertUser: {e}")
        return response.error(f"Internal server error: {e}")


# Endpoint para iniciar sesión
@user_bp.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data or not all(key in data for key in ("email", "paswd")):
            return jsonify({"error": "data invalid format"}), 400
        
        email = data.get('email')
        password = data.get('paswd')

        userOk = model.checkCredentials(email, password)
        
        if userOk[1] == True:  

            access_token = generate_access_token(userOk[0], password)
            session_id = str(uuid4())

            return jsonify({
                "message": "Login exitoso",
                "session_id": session_id,
                "token": access_token
            }), 200
        else:
            return jsonify({"error": "bad credencials"}), 401

    except Exception as e:
        return jsonify({"error": f"Error server: {str(e)}"}), 500

@user_bp.route('/api/logout', methods=['POST'])
def logout():
    try:
        data = request.get_json()
        sessionID = data.get('sessionid')

        if sessionID:
            session.pop(sessionID, None)
            return jsonify({"message": "Logout done"}), 200
        else:
            return jsonify({"error": "Session ID is required"}), 400

    except Exception as e:
        return jsonify({"error": f"Error server: {str(e)}"}), 500

