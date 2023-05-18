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


class Payment(UserEnum):
    VISA = "C"
    Mastercard = "D"
    PayPal = "BT"


class InfoUser(db.Model):
    __tablename__ = "infoUser"
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(2), nullable=False)
    month = db.Column(db.String(2), nullable=False)
    year = db.Column(db.String(4), nullable=False)
    gender = db.Column(db.Enum(Gender), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    payment_method = db.Column(db.Enum(Payment), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", back_populates="info_user")
    images = relationship("Image", back_populates="user")
    images = db.relationship("Image", back_populates="info_user")

    def __init__(
        self,
        day,
        month,
        year,
        gender,
        description,
        phone,
        address,
        payment_method,
    ):
        self.day = day
        self.month = month
        self.year = year
        self.gender = gender
        self.description = description
        self.phone = phone
        self.address = address
        self.payment_method = payment_method

    def __repr__(self):
        return f"<InfoUser {self.phone}>"

    def serialize(self):
        return {
            "id": self.id,
            "day": self.day,
            "month": self.month,
            "year": self.year,
            "gender": self.gender,
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


class NumberOfPets(UserEnum):
    ZERO = "0"
    ONE = "1"
    TWO = "2"
    THREE = "3"
    FOUR = "4"
    FIVE = "5"
    SIX = "6"
    SEVEN = "7"
    EIGHT = "8"
    NINE = "9"
    TEN = "10"


class InfoProvider(db.Model):
    __tablename__ = "infoProvider"
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(2), nullable=False)
    month = db.Column(db.String(2), nullable=False)
    year = db.Column(db.String(4), nullable=False)
    gender = db.Column(db.Enum(Gender), nullable=False)
    number_admitted_pets = db.Column(db.Enum(NumberOfPets), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    accepted_payment_method = db.Column(db.Enum(Payment), unique=True, nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey("provider.id"))
    provider = db.relationship("Provider", back_populates="info_provider")
    work_time_and_services_id = db.Column(
        db.Integer, db.ForeignKey("workTimeAndServices.id")
    )
    work_time_and_services = db.relationship(
        "WorkTimeAndServices", back_populates="info_provider"
    )
    images = db.relationship("Image", back_populates="info_provider")

    def __init__(
        self,
        day,
        month,
        year,
        gender,
        number_admitted_pets,
        description,
        address,
        phone,
        accepted_payment_method,
    ):
        self.day = day
        self.month = month
        self.year = year
        self.gender = gender
        self.number_admitted_pets = number_admitted_pets
        self.description = description
        self.address = address
        self.phone = phone
        self.accepted_payment_method = accepted_payment_method

    def __repr__(self):
        return f"<InfoProvider {self.phone}>"

    def serialize(self):
        return {
            "id": self.id,
            "day": self.day,
            "month": self.month,
            "year": self.year,
            "gender": self.gender,
            "number_admitted_pets": self.number_admitted_pets,
            "description": self.description,
            "address": self.address,
            "phone": self.phone,
            "accepted_payment_method": self.accepted_payment_method,
        }


class WorkTimeAndServices(db.Model):
    __tablename__ = "workTimeAndServices"
    id = db.Column(db.Integer, primary_key=True)
    morning = db.Column(db.Boolean, nullable=False)
    afternoon = db.Column(db.Boolean, nullable=False)
    evening = db.Column(db.Boolean, nullable=False)
    pet_sitter = db.Column(db.Boolean, nullable=False)
    dog_walker = db.Column(db.Boolean, nullable=False)
    house_sitter = db.Column(db.Boolean, nullable=False)
    pet_groomer = db.Column(db.Boolean, nullable=False)
    info_provider = db.relationship(
        "InfoProvider", back_populates="work_time_and_services"
    )

    def __init__(
        self,
        morning,
        afternoon,
        evening,
        pet_sitter,
        dog_walker,
        house_sitter,
        pet_groomer,
    ):
        self.morning = morning
        self.afternoon = afternoon
        self.evening = evening
        self.pet_sitter = pet_sitter
        self.dog_walker = dog_walker
        self.house_sitter = house_sitter
        self.pet_groomer = pet_groomer

    def __repr__(self):
        return f"<WorkTimeAndServices {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "morning": self.morning,
            "afternoon": self.afternoon,
            "evening": self.evening,
            "pet_sitter": self.pet_sitter,
            "dog_walker": self.dog_walker,
            "house_sitter": self.house_sitter,
            "pet_groomer": self.pet_groomer,
        }


class Image(db.Model):
    __tablename__ = "image"
    id = db.Column(db.Integer, primary_key=True)
    ruta = db.Column(db.String(300), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    provider_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    info_user_id = db.Column(db.Integer, db.ForeignKey("infoUser.id"))
    info_provider_id = db.Column(db.Integer, db.ForeignKey("infoProvider.id"))
    info_user = db.relationship("InfoUser", back_populates="images")
    info_provider = db.relationship("InfoProvider", back_populates="images")

    def __repr__(self):
        return f"<Image %r>" % self.id

    def serialize(self):
        return {
            "id": self.id,
            "ruta": self.ruta,
            "user_id": self.user_id,
            "info_provider_id": self.info_provider_id,
            "info_user_id": self.info_user_id,
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
