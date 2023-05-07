from flask_sqlalchemy import SQLAlchemy
from .db import db
from .ext import bcrypt
db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    surname = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(150), nullable=False)
    is_authenticated = db.Column(db.Boolean, nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('provider.id'))
    def __init__(self, name, surname, username, email, password, country, is_authenticated):
        self.name = name
        self.surname = surname
        self.username = username
        self.email = email
        self.password = password
        self.country = country
        self.is_authenticated = is_authenticated
    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "username": self.username,
            "email": self.email,
            "country": self.country,
            "is_authenticated": self.is_authenticated,
            # do not serialize the password, its a security breach
        }
        
class Provider(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    surname = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120), nullable=False)
    
    is_authenticated = db.Column(db.Boolean, nullable=False)
    users = db.relationship('User', backref='provider', lazy=True)
    def __init__(self, name, surname, username, email, password, country, is_authenticated):
        self.name = name
        self.surname = surname
        self.username = username
        self.email = email
        self.password = password
        self.country = country
        self.is_authenticated = is_authenticated
    def __repr__(self):
        return f'<Provider {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "username": self.username,
            "email": self.email,
            "country": self.country,
            "is_authenticated": self.is_authenticated,
        }
         # do not serialize the password, its a security breach

class TokenBlockedList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(250), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    email = db.Column(db.String(50), unique=False)
    def serialize(self):
        return {
            "id":self.id,
            "token":self.token,
            "created":self.created_at,
            "email":self.email
        }
