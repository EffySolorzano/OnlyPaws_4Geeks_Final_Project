from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Enum
from enum import Enum as UserEnum
from .db import db
from .ext import bcrypt
from datetime import datetime

db = SQLAlchemy()

class Gender(UserEnum):
    MALE = "M"
    FEMALE = "F"
    OTHER = "O"

class Payment(UserEnum):
    VISA = "C"
    MASTERCARD = "D"
    PAYPAL = "BT"
    
class ServiceChoices(UserEnum):
    PET_SITTER = "Pet Sitter"
    HOUSE_SITTER = "House Sitter"
    DOG_WALKER = "Dog Walker"
    PET_GROOMER = "Pet Groomer"

class AvailabilityChoices(UserEnum):
    MORNING = "Morning"
    AFTERNOON = "Afternoon"
    EVENING = "Evening"    

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
            "images": [image.serialize() for image in self.images]
            # do not serialize the password, its a security breach
        }



class InfoUser(db.Model):
    __tablename__ = "infoUser"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120),  nullable=False)
    phone = db.Column(db.String(120),  nullable=False)
    payment_method = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", back_populates="info_user")
    

    def __init__(
        self,
        date,
        gender,
        description,
        phone,
        address,
        payment_method,
        user_id=None
    ):
        self.date = date
        self.gender = gender
        self.description = description
        self.phone = phone
        self.address = address
        self.payment_method = payment_method
        self.user_id = user_id

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
    info_provider = db.relationship("InfoProvider", uselist=False, back_populates="provider")
    images = db.relationship("Image", back_populates="provider", lazy=True)

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
    __tablename__ = "infoProvider"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    services = db.Column(db.String(255), nullable=False)
    availability = db.Column(db.String(255), nullable=False)
    number_of_pets = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), nullable=False)
    payment_method = db.Column(db.String(120), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey("provider.id"))
    provider = db.relationship("Provider", back_populates="info_provider")
    

    def __init__(
        self,
        date,
        gender,
        availability,
        services,
        number_of_pets,
        description,
        address,
        phone,
        payment_method,
        provider_id 
    ):
        self.date = date
        self.gender = gender
        self.availability = availability
        self.services = services
        self. number_of_pets =  number_of_pets
        self.description = description
        self.address = address
        self.phone = phone
        self.payment_method = payment_method
        self.provider_id = provider_id 

    def __repr__(self):
        return f"<InfoProvider {self.phone}>"

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "gender": self.gender,
            "services": self.services,
            "availability": self.availability,
            "number_of_pets": self. number_of_pets,
            "description": self.description,
            "address": self.address,
            "phone": self.phone,
            "payment_method": self.payment_method,
            "provider_id ": self.provider_id 
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

