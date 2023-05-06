"""empty message

Revision ID: e675ce165497
Revises: 
Create Date: 2023-05-05 23:26:04.025333

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e675ce165497'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('provider',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('surname', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=120), nullable=False),
    sa.Column('country', sa.String(length=120), nullable=False),
    sa.Column('is_authenticated', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('token_blocked_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('token', sa.String(length=250), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('token')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('surname', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=120), nullable=False),
    sa.Column('country', sa.String(length=150), nullable=False),
    sa.Column('is_authenticated', sa.Boolean(), nullable=False),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['provider_id'], ['provider.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('is_authenticated'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('token_blocked_list')
    op.drop_table('provider')
    # ### end Alembic commands ###
