import os
import logging
from flask import Flask
from dotenv import load_dotenv

from src.utils import module_path

load_dotenv()

logging.basicConfig(
    format='[%(asctime)s] %(levelname)8s --- %(message)s ' +'(%(filename)s:%(lineno)s)',
	datefmt='%d/%m/%Y %I:%M:%S %p',
	level=logging.INFO,
	handlers=[
        		logging.FileHandler("debug.log", mode='w'),
        		logging.StreamHandler()
            ]
    )

def create_app():
    app = Flask(__name__)

    app.config['DEBUG'] = True
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = module_path()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    return app

app = create_app()