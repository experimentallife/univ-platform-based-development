"""empty message

Revision ID: 2b5e6629a210
Revises: b4150f3a3dbe
Create Date: 2022-11-13 20:44:56.956214

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b5e6629a210'
down_revision = 'b4150f3a3dbe'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    with op.batch_alter_table('todos', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('name', sa.String(length=100), nullable=False))
        batch_op.drop_column('todo_name')
        batch_op.drop_column('todo_id')
        batch_op.drop_column('author')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('todos', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author', sa.VARCHAR(length=50), nullable=True))
        batch_op.add_column(sa.Column('todo_id', sa.INTEGER(), nullable=False))
        batch_op.add_column(sa.Column('todo_name', sa.VARCHAR(length=100), nullable=False))
        batch_op.drop_column('name')
        batch_op.drop_column('id')

    op.create_table('users',
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('public_id', sa.VARCHAR(length=50), nullable=True),
    sa.Column('username', sa.VARCHAR(length=50), nullable=False),
    sa.Column('password', sa.VARCHAR(length=80), nullable=False),
    sa.Column('admin', sa.BOOLEAN(), nullable=False),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('public_id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###