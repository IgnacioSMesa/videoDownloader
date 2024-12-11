import re
import bcrypt

class User:
    def __init__(self, name, lastname, email, password =''):
        self.name = name
        self.lastname = lastname
        self.email = email
        self.password = self.hash_password(password)
    
    def hash_password(self, password):
        """Encripta la contraseña usando bcrypt."""
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return hashed

    def check_password(self, password):
        """Verifica si la contraseña proporcionada coincide con la encriptada."""
        return bcrypt.checkpw(password.encode('utf-8'), self.password)
    
    def validate_email(self):
        """Valida el formato del email."""
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(email_regex, self.email) is not None

    def __repr__(self):
        return f"User(name={self.name}, lastname={self.lastname}, email={self.email})"
