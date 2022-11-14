import graphene

from src.graphql.object import Todo
from src.services import create_todo

class TodoMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        is_complete = graphene.Boolean(required=True)

    todo = graphene.Field(lambda: Todo)

    def mutate(self, info, name, is_complete):
        _, todo = create_todo(name=name, is_complete=is_complete)
        return todo

class Mutation(graphene.ObjectType):
    mutate_todo = TodoMutation.Field()