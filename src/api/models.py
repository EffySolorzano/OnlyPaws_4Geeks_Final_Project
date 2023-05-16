from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Enum
from enum import Enum as UserEnum
from .db import db
from .ext import bcrypt
from datetime import datetime

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


class Gender(UserEnum):
    Male = "M"
    Female = "F"
    Other = "O"


class PetSize(UserEnum):
    Small = "S"
    Medium = "M"
    Big = "B"


class Payment(UserEnum):
    Credit = "C"
    Debit = "D"
    Bank_Transfer = "BT"


number_pets = [str(i) for i in range(1, 11)]


class InfoUser(db.Model):
    __tablename__ = "infoUser"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    # Time default=datetime.utcnow
    gender = db.Column(db.Enum(Gender), nullable=False)
    pets = db.Column(Enum(*number_pets), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    pet_size = db.Column(db.Enum(PetSize), nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    payment_method = db.Column(db.Enum(Payment), unique=True, nullable=False)
    is_authenticated = db.Column(db.Boolean, nullable=False)
    info_provider_id = db.Column(db.Integer, db.ForeignKey("infoProvider.id"))
    provider = relationship("InfoProvider", back_populates="info_users")
    images = relationship("Image", back_populates="user")

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
        return f"<InfoUser {self.phone}>"

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


class WorkTime(UserEnum):
    Morning = "M"
    Afternoon = "A"
    Evening = "E"


class Services(UserEnum):
    Pet_Sitter = "PS"
    Pet_Walker = "W"
    House_Sitter = "HS"
    Groomer = "G"


class TypePetsAllowed(UserEnum):
    Dogs = "D"
    Cats = "C"
    Birds = "B"
    Horses = "H"
    Reptiles = "R"


admitted_pets = [str(i) for i in range(1, 11)]


class InfoProvider(db.Model):
    __tablename__ = "infoProvider"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    # Time default=datetime.utcnow
    gender = db.Column(db.Enum(Gender), nullable=False)
    work_time = db.Column(db.Enum(WorkTime), nullable=False)
    service = db.Column(db.Enum(Services), nullable=False)
    allowed_pets = db.Column(db.Enum(TypePetsAllowed), unique=True, nullable=False)
    number_admitted_pets = db.Column(Enum(*admitted_pets), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    accepted_payment_method = db.Column(db.Enum(Payment), unique=True, nullable=False)
    is_authenticated = db.Column(db.Boolean, nullable=False)
    info_users = relationship("InfoUser", back_populates="provider")

    def __init__(
        self,
        date,
        gender,
        work_time,
        service,
        allowed_pets,
        number_admitted_pets,
        description,
        address,
        phone,
        accepted_payment_method,
        is_authenticated,
    ):
        self.date = date
        self.gender = gender
        self.work_time = work_time
        self.service = service
        self.allowed_pets = allowed_pets
        self.number_admitted_pets = number_admitted_pets
        self.description = description
        self.address = address
        self.phone = phone
        self.accepted_payment_method = accepted_payment_method
        self.is_authenticated = is_authenticated

    def __repr__(self):
        return f"<InfoProvider {self.phone}>"

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "gender": self.gender,
            "work_time": self.work_time,
            "service": self.service,
            "allowed_pets": self.allowed_pets,
            "number_admitted_pets": self.number_admitted_pets,
            "description": self.description,
            "address": self.address,
            "phone": self.phone,
            "accepted_payment_method": self.accepted_payment_method,
            "is_authenticated": self.is_authenticated,
        }


class Image(db.Model):
    __tablename__ = "image"
    id = db.Column(db.Integer, primary_key=True)
    ruta = db.Column(db.String(300), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    info_provider_id = db.Column(db.Integer, db.ForeignKey("infoProvider.id"))
    info_user_id = db.Column(db.Integer, db.ForeignKey("infoUser.id"))
    user = relationship("InfoUser", back_populates="images")

    def __repr__(self):
        return f"<Image %r>" % self.id

    def serialize(self):
        return {
            "id": self.id,
            "ruta": self.ruta,
            "user_id": self.user_id,
            "infoprovider_id": self.info_provider_id,
            "infouser_id": self.info_user_id,
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
