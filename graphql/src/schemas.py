from flask_marshmallow import Marshmallow

from src.config import app

ma = Marshmallow(app)

class TodoSchema(ma.Schema):
    class Meta:
        fields = ('todo_id', 'todo_name', 'is_complete', 'author')