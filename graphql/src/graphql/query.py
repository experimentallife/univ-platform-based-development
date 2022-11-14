from graphene import relay, ObjectType, Int
from src.services import get_one_todo, get_all_todos

class Query(ObjectType):
    id = Int()

    def resolver_user(self, info, id):
        _, todo = get_one_todo(id)
        return todo

    def resolve_users(self, info):
        _, todos = get_all_todos()
        return todos
