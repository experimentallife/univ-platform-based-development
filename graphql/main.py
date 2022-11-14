from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_graphql import GraphQLView
from waitress import serve

from src.config import logging
from src.graphql import schema
from src.models import db
from src.api import app

migrate = Migrate(app, db)
cors = CORS(app)

def init_graphql():
    app.add_url_rule(
        '/graphql',
        view_func=GraphQLView.as_view(
            'graphql',
            schema=schema,
            graphiql=True
        )
    )

if __name__ == '__main__':
    logging.info("Starting server...")
    init_graphql()
    serve(app, host="0.0.0.0", port=5000)