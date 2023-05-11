"""empty message

Revision ID: b71ca762f2a9
Revises: 
Create Date: 2023-05-11 00:03:09.764948

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b71ca762f2a9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('infoProvider',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(length=120), nullable=False),
    sa.Column('gender', sa.Enum('Male', 'Female', 'Other', name='gender'), nullable=False),
    sa.Column('work_time', sa.String(length=120), nullable=False),
    sa.Column('service', sa.Boolean(), nullable=False),
    sa.Column('pets_admited', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=False),
    sa.Column('phone', sa.String(length=120), nullable=False),
    sa.Column('payment_method', sa.Boolean(), nullable=False),
    sa.Column('is_authenticated', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('address'),
    sa.UniqueConstraint('payment_method'),
    sa.UniqueConstraint('pets_admited'),
    sa.UniqueConstraint('phone')
    )
    op.create_table('provider',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('surname', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('country', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=120), nullable=False),
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
    op.create_table('infoUser',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(length=120), nullable=False),
    sa.Column('gender', sa.Enum('Male', 'Female', 'Other', name='gender'), nullable=False),
    sa.Column('pets', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('pet_size', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=False),
    sa.Column('phone', sa.String(length=120), nullable=False),
    sa.Column('payment_method', sa.Boolean(), nullable=False),
    sa.Column('is_authenticated', sa.Boolean(), nullable=False),
    sa.Column('info_provider_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['info_provider_id'], ['infoProvider.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('address'),
    sa.UniqueConstraint('payment_method'),
    sa.UniqueConstraint('pets'),
    sa.UniqueConstraint('phone')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('surname', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('country', sa.String(length=150), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=120), nullable=False),
    sa.Column('is_authenticated', sa.Boolean(), nullable=False),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['provider_id'], ['provider.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('image',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ruta', sa.String(length=300), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('info_provider_id', sa.Integer(), nullable=True),
    sa.Column('info_user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['info_provider_id'], ['infoProvider.id'], ),
    sa.ForeignKeyConstraint(['info_user_id'], ['infoUser.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('ruta')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('image')
    op.drop_table('user')
    op.drop_table('infoUser')
    op.drop_table('token_blocked_list')
    op.drop_table('provider')
    op.drop_table('infoProvider')
    # ### end Alembic commands ###