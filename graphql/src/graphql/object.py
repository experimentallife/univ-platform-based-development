import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType
from src.models import TodoModel

class Todo(SQLAlchemyObjectType):
    class Meta:
        model = TodoModel
        interfaces = (relay.Node,)
