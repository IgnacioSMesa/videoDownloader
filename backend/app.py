from flask import Flask
from routes.user import user_bp
from flask_cors import CORS
from dotenv import load_dotenv 
import os
load_dotenv()
app = Flask(__name__)

CORS(app)

# Registrar el blueprint
app.register_blueprint(user_bp)

if __name__ == '__main__':
    app.run(debug=True)
