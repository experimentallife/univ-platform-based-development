from flask_sqlalchemy import SQLAlchemy

from src.config import app

db = SQLAlchemy(app)
   
class TodoModel(db.Model):

    __tablename__ = 'todos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    is_complete = db.Column(db.Boolean, nullable=False)

    def __init__(self, name, is_complete):
        self.name = name
        self.is_complete = is_complete

    def __repr__(self):
        return f"<Todo {self.name}>"
