import graphene

from src.graphql.mutation import Mutation
from src.graphql.query import Query

schema = graphene.Schema(query=Query, mutation=Mutation)