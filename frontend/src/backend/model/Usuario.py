class Persona:
    def __init__(self, id, name,lastname,email,pasword):
        self.id = id
        self.name = name
        self.lastname = lastname
        self.email = email
        self.pasword = pasword

    def get_id(self):
        return self.id

    def set_id(self, value):
        self.id = value

    def get_name(self):
        return self.name

    def set_name(self, value):
        self.name = value

    def get_lastname(self):
        return self.lastname

    def set_lastname(self, value):
        self.lastname = value

    def get_email(self):
        return self.email

    def set_email(self, value):
        self.email = value

    def get_pasword(self):
        return self.pasword

    def set_pasword(self, value):
        self.pasword = value


    def __str__(self):
        return f"Usuario(Name: {self.name}, Lastname: {self.lastname}, Email: {self.email})"
    
    def to_dict(self):
        return{
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email" : self.email
        }
        
    