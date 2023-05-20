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
    info_user = db.relationship("InfoUser", uselist=False, back_populates="user")
    images = db.relationship("Image", back_populates="user", lazy=True)

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
            "images": [image.serialize() for image in self.images]
            # do not serialize the password, its a security breach
        }


class InfoUser(db.Model):
    __tablename__ = "infoUser"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), nullable=False)
    payment_method = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", back_populates="info_user")

    def __repr__(self):
        return f"<InfoUser {self.phone}>"

    def serialize(self):
        return {
            "id": self.id,
            "gender": self.gender,
            "date": self.date,
            "description": self.description,
            "phone": self.phone,
            "address": self.address,
            "payment_method": self.payment_method,
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
    info_provider = db.relationship(
        "InfoProvider", uselist=False, back_populates="provider"
    )
    images = db.relationship("Image", back_populates="provider", lazy=True)

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
    __tablename__ = "infoProvider"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    morning = db.Column(db.Boolean, nullable=False, default=False)
    afternoon = db.Column(db.Boolean, nullable=False, default=False)
    evening = db.Column(db.Boolean, nullable=False, default=False)
    pet_sitter = db.Column(db.Boolean, nullable=False, default=False)
    house_sitter = db.Column(db.Boolean, nullable=False, default=False)
    dog_walker = db.Column(db.Boolean, nullable=False, default=False)
    pet_groomer = db.Column(db.Boolean, nullable=False, default=False)
    number_of_pets = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), nullable=False)
    payment_method = db.Column(db.String(120), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey("provider.id"))
    provider = db.relationship("Provider", back_populates="info_provider")

    def __repr__(self):
        return f"<InfoProvider {self.phone}>"

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "gender": self.gender,
            "morning": self.morning,
            "afternoon": self.afternoon,
            "evening": self.evening,
            "pet_sitter": self.pet_sitter,
            "house_sitter": self.house_sitter,
            "dog_walker": self.dog_walker,
            "pet_groomer": self.pet_groomer,
            "number_of_pets": self.number_of_pets,
            "description": self.description,
            "address": self.address,
            "phone": self.phone,
            "payment_method": self.payment_method,
            "provider_id ": self.provider_id,
        }


class Image(db.Model):
    __tablename__ = "image"
    id = db.Column(db.Integer, primary_key=True)
    ruta = db.Column(db.String(300), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    provider_id = db.Column(db.Integer, db.ForeignKey("provider.id"))

    user = db.relationship("User", back_populates="images")
    provider = db.relationship("Provider", back_populates="images")

    def __repr__(self):
        return f"<Image {self.id}>"

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
            "created_at": self.created_at,
            "email": self.email,
        }
