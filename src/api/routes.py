"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import openai
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import TokenBlockedList, db, User, Provider, Image
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity, get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import generate_password_hash
from api.ext import jwt, bcrypt
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import date, time, datetime, timezone, timedelta


import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(
cloud_name = os.getenv("CLOUDINARY_NAME"),
api_key = os.getenv("CLOUDINARY_KEY"),
api_secret = os.getenv("CLOUDINARY_SECRET"),
api_proxy = "http://proxy.server:9999"
)

openai.api_key = os.environ.get('OPENAI_API_KEY')


api = Blueprint("api", __name__)

EMAIL = os.environ.get("EMAIL")
PASSWORD = os.environ.get("PASSWORD")


def sendEmail(message, to, subject):
    smtp_address = "smtp.gmail.com"
    stmp_port = 465  # SLL

    print(message, to, subject)

    messageMime = MIMEMultipart("alternative")  # JSON, text, application, pdf
    messageMime["Subject"] = subject
    messageMime["To"] = to
    messageMime["From"] = EMAIL

    html = (
        """   

     <html>
     <body>
        <h1> Hi, """
        + to
        + """ <h1>
        <p>"""
        + message
        + """ </p>
     </body>
     </html>
    
    """
    )

    # create mimetext elements
    text_mime = MIMEText(subject, "plain")
    html_mime = MIMEText(html, "html")

    # attached MIMEText to MIMEMultipart
    messageMime.attach(text_mime)
    messageMime.attach(html_mime)

    # connect to gmails 465 port to send email
    context = ssl.create_default_context()
    emailFrom = EMAIL
    password = PASSWORD
    with smtplib.SMTP_SSL(smtp_address, stmp_port, context=context) as server:
        server.login(emailFrom, password)
        server.sendmail(emailFrom, to, messageMime.as_string())

        return jsonify({"message": "email sent"}), 200


@api.route("/hello", methods=["POST", "GET"])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/email", methods=["POST"])
def handle_email():
    body = request.get_json()
    message = body["message"]
    to = body["to"]
    subject = body["subject"]

    sendEmail(message, to, subject)

    return jsonify({"message": "email sent"}), 200


############# USER - PET PARENT REGISTER, GET, PUT, POST, DELETE ############
@api.route("/register", methods=["POST"])
def register_handle():
    body = request.get_json()
    print()
    email = body["email"]
    name = body["name"]
    surname = body["surname"]
    username = body["username"]
    password = body["password"]
    country = body["country"]
    is_authenticated = body["is_authenticated"]
    # check if username exists on database
    if (
        User.query.filter_by(username=body["username"]).first()
        or User.query.filter_by(email=body["email"]).first()
    ):
        return jsonify({"error": "Username or email already exists"}), 400
    # validaciones
    if body is None:
        raise APIException(
            "You need to specify the request body as json object", status_code=400
        )
    if "email" not in body:
        raise APIException("You need to specify the email", status_code=400)
    if "name" not in body:  # add this check for the 'fullname' key
        raise APIException("You need to specify the name", status_code=400)
    if "surname" not in body:  # add this check for the 'fullname' key
        raise APIException("You need to specify the suname", status_code=400)
    if "username" not in body:  # add this check for the 'username' key
        raise APIException("You need to specify the username", status_code=400)
    if "password" not in body:  # add this check for the 'password' key
        raise APIException("You need to specify the password", status_code=400)
    if "country" not in body:  # add this check for the 'password' key
        raise APIException("You need to specify the country", status_code=400)

    # hashing the password
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    # creada la clase User en la variable new_user
    new_user = User(
        email=email,
        name=name,
        surname=surname,
        username=username,
        password=hashed_password,
        country=country,
        is_authenticated=is_authenticated,
    )
    # comitear la sesión
    db.session.add(new_user)  # agregamos el nuevo usuario a la base de datos
    db.session.commit()  # guardamos los cambios en la base de datos
    return jsonify({"mensaje": "User successfully created"}), 201


############# PROVIDER REGISTER################
@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users), 200


############# PROVIDER REGISTER, GET, POST, PUT, DELETE################
@api.route("/register-provider", methods=["POST"])
def register_provider():
    body = request.get_json()
    print(body)
    email = body["email"]
    name = body["name"]
    surname = body["surname"]
    username = body["username"]
    password = body["password"]
    country = body["country"]
    is_authenticated = body["is_authenticated"]
    # check if username exists on database
    if (
        Provider.query.filter_by(username=body["username"]).first()
        or Provider.query.filter_by(email=body["email"]).first()
    ):
        return jsonify({"error": "Username or email already exists"}), 400
    if body is None:
        raise APIException(
            "You need to specify the request body as json object", status_code=400
        )
    if "email" not in body:
        raise APIException("You need to specify the email", status_code=400)
    if "name" not in body:  # add this check for the 'fullname' key
        raise APIException("You need to specify the name", status_code=400)
    if "surname" not in body:  # add this check for the 'fullname' key
        raise APIException("You need to specify the suname", status_code=400)
    if "username" not in body:  # add this check for the 'username' key
        raise APIException("You need to specify the username", status_code=400)
    if "password" not in body:  # add this check for the 'password' key
        raise APIException("You need to specify the password", status_code=400)
    if "country" not in body:  # add this check for the 'password' key
        raise APIException("You need to specify the country", status_code=400)

    # hashing the password
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_Provider = Provider(
        email=email,
        name=name,
        surname=surname,
        username=username,
        password=hashed_password,
        country=country,
        is_authenticated=is_authenticated,
    )
    db.session.add(new_Provider)
    db.session.commit()
    return jsonify({"mensaje": "Provider successfully created"}), 201


####GET#####


@api.route("/providers", methods=["GET"])
def get_providers():
    providers = Provider.query.all()
    serialized_providers = [provider.serialize() for provider in providers]
    return jsonify(serialized_providers), 200


################ LOGIN / LOGOUT ###################
def verificacionToken(jti):
    jti  # Identificador del JWT (es más corto)
    print("jit", jti)
    token = TokenBlockedList.query.filter_by(token=jti).first()
    if token is None:
        return False
    return True


blacklist = set()


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    provider = Provider.query.filter_by(email=email).first()

    # Verificamos el nombre de usuario
    if user is None and provider is None:
        return jsonify({"message": "Login failed"}), 401

    # Validar clave
    if user and not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Login failed"}), 401

    # Generar Token
    if user:
        identity = user.id
    else:
        identity = provider.id

    access_token = create_access_token(identity=identity)

    # Successful login
    return (
        jsonify({"message": "Logged in successfully", "access_token": access_token}),
        200,
    )


@api.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    blacklist.add(jti)
    return jsonify({"message": "Log out successfully"}), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    token = verificacionToken(
        get_jwt()["jti"]
    )  # reuso la función de verificacion de token
    if token:
        raise APIException("Black listed token", status_code=404)
    print("The user is: ", user.name)
    return jsonify({"message": "Protected route"}), 200

######### API 3rd PARTY INTEGRATION ###########

@api.route('/chatgpt', methods=['POST'])
def open_ai():
    body =request.get_json()    
    prompt = "You're a website named Onlypaws that offers pet sitting and house sitting services for pet parents, along other features like pet playdates, grooming, dog walker and tips how to care for different types of pets  " + body['prompt']

    completion = openai.Completion.create(engine="text-davinci-003",
                            prompt=prompt,
                            n=1,
                            max_tokens=2048)
    
    print(completion.choices[0])
    print(completion.choices[0].text)
    dictionary = {"reply": completion.choices[0].text}
    
    
    return jsonify(dictionary), 200