from .BBDD import BBDD
import mysql.connector
import jwt
import datetime
from .User import User
import bcrypt

class UserModel:
    
    db = BBDD(host='localhost', user='root', password='', database='descargadorVideos', port=3306)
    
    def __init__(self):
        self.conexion = UserModel.db.conectar()

    def getUsers(self):
        cursor = self.conexion.cursor()
        try:
            cursor.execute("SELECT name, lastname, email FROM usuario")
            result = cursor.fetchall()
            users = []
            for data in result:
                user = User(name=data[0], lastname=data[1], email=data[2])
                users.append({
                    'name': user.name,
                    'lastname': user.lastname,
                    'email': user.email
                })
            return users
            
        except mysql.connector.Error as e:
            print(f"Error al obtener usuarios: {e}")
            return []
        finally:
            cursor.close()
    
    def createUser(self, name, lastname, email, paswd):
        cursor = self.conexion.cursor();
        try:
            sql = "INSERT INTO usuario(name, lastname, email, pasword) VALUES(%s, %s, %s, %s)"
            cursor.execute(sql, (name, lastname, email, paswd))
            self.conexion.commit()
            print("Datos insertados")
        except mysql.connector.Error as e:
            print(f"Error en la consulta: {e}",  self.conexion.rollback())
        finally:
            cursor.close()


    def checkCredentials(self, email, paswd):
        cursor = self.conexion.cursor()
        try:
            sql = "SELECT email, pasword FROM usuario WHERE email = %s"
            cursor.execute(sql, (email,))
            result = cursor.fetchone()

            if result:  
                stored_password_hash = result[1] 
                passwd = bcrypt.checkpw(paswd.encode('utf-8'), stored_password_hash.encode('utf-8'))
            
                if passwd :
                    return "Credencials ok", passwd
                else:
                    return "Contraseña not ok", passwd
            else:
                return "Email address not found"
            
        except mysql.connector.Error as e:
            print(f"Error query: {e}")
            return "Error quiery"
        finally:
            cursor.close()

