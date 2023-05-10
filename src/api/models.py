from flask_sqlalchemy import SQLAlchemy
from .db import db
from .ext import bcrypt

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    surname = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    country = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_authenticated = db.Column(db.Boolean, nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey("provider.id"))

    def __init__(
        self, name, surname, username, country, email, password, is_authenticated
    ):
        self.name = name
        self.surname = surname
        self.username = username
        self.country = country
        self.email = email
        self.password = password
        self.is_authenticated = is_authenticated

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "username": self.username,
            "country": self.country,
            "email": self.email,
            "is_authenticated": self.is_authenticated,
            # do not serialize the password, its a security breach
        }


class InfoUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(120), nullable=False)
    gender = db.Column(db.String(120), nullable=False)
    pets = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    pet_size = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    payment_method = db.Column(db.Boolean, unique=True, nullable=False)
    is_authenticated = db.Column(db.Boolean, nullable=False)
    infoProvider_id = db.Column(db.Integer, db.ForeignKey("infoProvider.id"))

    def __init__(
        self,
        date,
        gender,
        pets,
        description,
        pet_size,
        phone,
        address,
        payment_method,
        is_authenticated,
    ):
        self.date = date
        self.gender = gender
        self.pets = pets
        self.description = description
        self.pet_size = pet_size
        self.phone = phone
        self.address = address
        self.payment_method = payment_method
        self.is_authenticated = is_authenticated

    def __repr__(self):
        return f"<InfoUser {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "gender": self.gender,
            "date": self.date,
            "pets": self.pets,
            "description": self.description,
            "pet_size": self.pet_size,
            "phone": self.phone,
            "address": self.address,
            "payment_method": self.payment_method,
            "is_authenticated": self.is_authenticated,
            # do not serialize the password, its a security breach
        }


class Provider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    surname = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    country = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    is_authenticated = db.Column(db.Boolean, nullable=False)
    users = db.relationship("User", backref="provider", lazy=True)

    def __init__(
        self, name, surname, username, country, email, password, is_authenticated
    ):
        self.name = name
        self.surname = surname
        self.username = username
        self.country = country
        self.email = email
        self.password = password
        self.is_authenticated = is_authenticated

    def __repr__(self):
        return f"<Provider {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "username": self.username,
            "country": self.country,
            "email": self.email,
            "is_authenticated": self.is_authenticated,
        }
        # do not serialize the password, its a security breach


class InfoProvider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(120), nullable=False)
    gender = db.Column(db.String(120), nullable=False)
    work_time = db.Column(db.String(120), nullable=False)
    service = db.Column(db.Boolean, nullable=False)
    pets_admited = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    payment_method = db.Column(db.Boolean, unique=True, nullable=False)
    is_authenticated = db.Column(db.Boolean, nullable=False)
    info_users = db.relationship("InfoUser", backref="InfoProvider", lazy=True)

    def __init__(
        self,
        date,
        gender,
        work_time,
        service,
        pets_admited,
        description,
        address,
        phone,
        payment_method,
        is_authenticated,
    ):
        self.date = date
        self.gender = gender
        self.work_time = work_time
        self.service = service
        self.pets_admited = pets_admited
        self.description = description
        self.address = address
        self.phone = phone
        payment_method = payment_method
        self.is_authenticated = is_authenticated

    def __repr__(self):
        return f"<InfoProvider {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "gender": self.gender,
            "work_time": self.work_time,
            "service": self.service,
            "pets_admited": self.pets_admited,
            "description": self.description,
            "address": self.address,
            "phone": self.phone,
            "payment_method": self.payment_method,
            "is_authenticated": self.is_authenticated,
            # do not serialize the password, its a security breach
        }


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ruta = db.Column(db.String(300), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("infoUser.id"))
    infoProvider_id = db.Column(db.Integer, db.ForeignKey("infoProvider.id"))
    infoUser_id = db.Column(db.Integer, db.ForeignKey("infoUser.id"))

    def __repr__(self):
        return f"<Image %r>" % self.id

    def serialize(self):
        return {
            "id": self.id,
            "ruta": self.ruta,
            "user_id": self.user_id,
            "provider_id": self.provider_id,
        }


class TokenBlockedList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(250), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    email = db.Column(db.String(50), unique=False)

    def serialize(self):
        return {
            "id": self.id,
            "token": self.token,
            "created": self.created_at,
            "email": self.email,
        }
