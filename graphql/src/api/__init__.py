import datetime

from flask import request, jsonify

from src.config import app
from src.services import create_todo, get_one_todo, get_all_todos

@app.route('/', methods=['GET'])
def home():
    return jsonify({ 'status': 'Online' })

@app.route('/todo', methods=['POST'])
def create_todo_endpoint():
    name = request.json["name"].lower()
    is_complete = request.json["is_complete"]

    success, todo = create_todo(name, is_complete)

    if not success:
        return jsonify({
            'success': success,
            'message': 'todo with the same name already exists.'
        })

    return jsonify({
        'success': success,
        'message': 'todo was created successfully!',
        'data': todo
    })

@app.route('/todo', methods=['GET'])
def get_all_todos_endpoint():
    success, todos = get_all_todos()
    return todos
    return jsonify({
        'success': success,
        'message': 'todos fetching successfully!',
        'data': todos
    })

@app.route('/todo/<todo_id>', methods=['GET'])
def get_one_todo_endpoint(todo_id):
    success, todo = get_one_todo(todo_id)

    if not success:
        return jsonify({
            'success': success,
            'message': 'todo not found!'
        })

    return jsonify({
        'success': success,
        'message': 'todo fetching successgully!',
        'data': todo
    })

