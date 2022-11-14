from flask import jsonify
from src.models import db, TodoModel
from src.schemas import TodoSchema

todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)

def create_todo(name, is_complete):
    todo = TodoModel.query.filter_by(name=name).first()

    if todo is None:
        new_todo = TodoModel(name=name, is_complete=is_complete)
        
        db.session.add(new_todo)
        db.session.commit()

        return True, todo_schema.jsonify(new_todo)

    return False, None

def get_one_todo(id):
    todo = TodoModel.query.filter_by(id=id).first()

    if todo is not None:
        return True, todo_schema.jsonify(todo)

    return False, None

def get_all_todos():
    todos = TodoModel.query.all()
    result = todos_schema.dump(todos)

    return True, jsonify(result)