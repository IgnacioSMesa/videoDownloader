import mysql.connector
from mysql.connector import Error

class BBDD:
    def __init__(self, host, user, password, database, port=3306):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.port = port

    def conectar(self):
        """Establece una conexión a la base de datos MySQL y retorna el objeto conexión."""
        try:
            conn = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
                port=self.port
            )
            if conn.is_connected():
                print(f"Conexión exitosa a la base de datos {self.database}")
                return conn
        except Error as e:
            print(f"Error al conectar con la base de datos: {e}")
            return None


