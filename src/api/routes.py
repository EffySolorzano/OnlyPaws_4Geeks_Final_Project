"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import openai
from sqlalchemy import exc
from flask import Flask, request, jsonify, url_for, Blueprint
from flask import current_app as app 
from api.models import (
    TokenBlockedList,
    db,
    User,
    Provider,
    InfoUser,
    InfoProvider,
    Image,
)
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity, get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import generate_password_hash
from flask_mail import Mail, Message
from api.ext import jwt, bcrypt
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import date, time, datetime, timezone, timedelta
from itsdangerous import URLSafeTimedSerializer

import cloudinary
import cloudinary.uploader
import cloudinary.api


cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_NAME"),
    api_key=os.getenv("CLOUDINARY_KEY"),
    api_secret=os.getenv("CLOUDINARY_SECRET"),
    api_proxy="http://proxy.server:9999",
)

openai.api_key = os.environ.get("OPENAI_API_KEY")


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
    
  
    # Create a welcome message for the email
    welcome_message = (f"Welcome, {name}! Thank you for choosing OnlyPaws, your trusted partner in pet care services. "
    "We are thrilled to have you on board. Whether you need pet sitting, house sitting, dog walking, "
    "pet grooming, or simply want to connect with fellow pet parents, we've got you covered. "
    "Our dedicated team of pet enthusiasts is committed to providing the best care and attention to your "
    "beloved furry friends. Feel free to explore our app and discover a world of possibilities for your pets. "
    "If you have any questions or need assistance, don't hesitate to reach out to us. We look forward to "
    "serving you and your pets!\n\n"
    
    "Best regards,\n"
    "The OnlyPaws Team"
    )
    # Send the welcome email
    sendEmail(welcome_message, email, "Welcome to OnlyPaws")
    
    
    return jsonify({"mensaje": "User successfully created"}), 201


############ GET


@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    serialized_users = []

    for user in users:
        serialized_user = user.serialize()

        # Check if the user has associated InfoUser
        info_user = InfoUser.query.filter_by(user_id=user.id).first()
        if info_user:
            serialized_info_user = info_user.serialize()
            serialized_user["info_user"] = serialized_info_user

        serialized_users.append(serialized_user)

    return jsonify(serialized_users), 200


###################
@api.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    serialized_user = user.serialize()

    # Check if the user has associated InfoUser
    info_user = InfoUser.query.filter_by(user_id=user.id).first()
    if info_user:
        serialized_info_user = info_user.serialize()
        serialized_user["info_user"] = serialized_info_user

    return jsonify(serialized_user), 200

#######INFOUSER-GET
@api.route("/info_user", methods=["GET"])
@jwt_required()
def get_info_user():
    current_user_id = get_jwt_identity()

    # Validate and retrieve the user_id from the current user
    user_id = current_user_id
    if user_id is None:
        return jsonify({"error": "Missing user ID"}), 400

    # Fetch the user based on the provided user_id
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Fetch the corresponding InfoUser data for the user
    info_user = InfoUser.query.filter_by(user_id=user_id).first()
    if not info_user:
        return jsonify({"error": "InfoUser data not found"}), 404
     
    try:
        # Return the serialized InfoUser data
        return jsonify(info_user.serialize()), 200
    except exc.SQLAlchemyError:
        return jsonify({"error": "Failed to fetch InfoUser data"}), 500


######### INFOUSER-POST
@api.route("/info_user", methods=["POST"])
@jwt_required()
def create_info_user():
    current_user_id = get_jwt_identity()

    body = request.get_json()

    # Validate and retrieve the user_id from the current user
    user_id = current_user_id
    if user_id is None:
        return jsonify({"error": "Missing user ID"}), 400

    # Fetch the user based on the provided user_id
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Create a new InfoUser instance
    new_info_user = InfoUser(
        day=body["day"],
        month=body["month"],
        year=body["year"],
        gender=body["gender"],
        description=body["description"],
        address=body["address"],
        phone=body["phone"],
        payment_method=body["paymentMethod"],
        user_id=user_id,
    )

    try:
        # Save the new InfoUser instance to the database
        db.session.add(new_info_user)
        db.session.commit()
        return jsonify(new_info_user.serialize()), 201
    except exc.SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "Failed to create info user"}), 500

########### PUT
@api.route("/info_user-edit", methods=["PUT"])
@jwt_required()
def update_user():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()

    # Update the User information
    user.name = body.get("name", user.name)
    user.surname = body.get("surname", user.surname)
    user.email = body.get("email", user.email)
    user.username = body.get("username", user.username)
    user.password = body.get("password", user.password)
    user.country = body.get("country", user.country)
    db.session.commit()

    # Check if the User has an associated InfoUser
    info_user = InfoUser.query.filter_by(user_id=user.id).first()
    if info_user:
        # Update the InfoUser information
        info_user.day = body.get("day", info_user.day)
        info_user.month = body.get("month", info_user.month)
        info_user.year = body.get("year", info_user.year)
        info_user.gender = body.get("gender", info_user.gender)
        info_user.description = body.get("description", info_user.description)
        info_user.phone = body.get("phone", info_user.phone)
        info_user.address = body.get("address", info_user.address)
        info_user.payment_method = body.get("payment_method", info_user.payment_method)
        db.session.commit()

    # Serialize the updated User object along with associated InfoUser information
    serialized_user = user.serialize()
    if info_user:
        serialized_user["info_user"] = info_user.serialize()

    return jsonify(serialized_user), 200



######### DELETE
@api.route("/info_user", methods=["DELETE"])
@jwt_required()
def delete_user():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    if not user:
        return jsonify({"error": "Provider not found"}), 404

    # Check if the Provider has an associated InfoProvider
    info_user = InfoUser.query.filter_by(user_id=user.id).first()

    # Delete the InfoProvider if it exists
    if info_user:
        db.session.delete(info_user)

    # Delete the Provider
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "Provider deleted successfully"}), 200



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
            "You need to specify the request body as a JSON object", status_code=400
        )
    if "email" not in body:
        raise APIException("You need to specify the email", status_code=400)
    if "name" not in body:
        raise APIException("You need to specify the name", status_code=400)
    if "surname" not in body:
        raise APIException("You need to specify the surname", status_code=400)
    if "username" not in body:
        raise APIException("You need to specify the username", status_code=400)
    if "password" not in body:
        raise APIException("You need to specify the password", status_code=400)
    if "country" not in body:
        raise APIException("You need to specify the country", status_code=400)

    # Hashing the password
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

    provider_id = new_Provider.id

    # Create a welcome message for the email
    welcome_message = f"Welcome, {name}! Thank you for choosing OnlyPaws, your trusted partner in pet care services. We are thrilled to have you on board. Whether you need pet sitting, house sitting, dog walking, pet grooming, or simply want to connect with fellow pet parents, we've got you covered. Our dedicated team of pet enthusiasts is committed to providing the best care and attention to your beloved furry friends. Feel free to explore our app and discover a world of possibilities for your pets. If you have any questions or need assistance, don't hesitate to reach out to us. We look forward to serving you and your pets! Best regards, The OnlyPaws Team"

    # Send the welcome email
    sendEmail(welcome_message, email, "Welcome to OnlyPaws")

    return jsonify({"mensaje": "Provider successfully created", "provider_id": provider_id}), 201



####GET#####
@api.route("/providers", methods=["GET"])
def get_providers():
    providers = Provider.query.all()
    serialized_providers = []

    for provider in providers:
        serialized_provider = provider.serialize()

        # Check if the provider has associated InfoProvider
        info_provider = InfoProvider.query.filter_by(provider_id=provider.id).first()
        if info_provider:
            serialized_info_provider = info_provider.serialize()
            serialized_provider["info_provider"] = serialized_info_provider

        serialized_providers.append(serialized_provider)

    return jsonify(serialized_providers), 200


#########
@api.route("/providers/<int:provider_id>", methods=["GET"])
def get_provider(provider_id):
    provider = Provider.query.get(provider_id)
    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    serialized_provider = provider.serialize()

    # Check if the provider has associated InfoProvider
    info_provider = InfoProvider.query.filter_by(provider_id=provider.id).first()
    if info_provider:
        serialized_info_provider = info_provider.serialize()
        serialized_provider["info_provider"] = serialized_info_provider

    return jsonify(serialized_provider), 200

######INFOPROVIDER-GET
@api.route("/info_provider", methods=["GET"])
@jwt_required()
def get_info_provider():
    current_provider_id = get_jwt_identity()

    # Validate and retrieve the provider_id
    provider_id = current_provider_id
    if provider_id is None:
        return jsonify({"error": "Missing provider ID"}), 400

    # Fetch the provider based on the provided provider_id
    provider = Provider.query.filter_by(id=provider_id).first()
    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    # Fetch the corresponding InfoProvider data for the provider
    info_provider = InfoProvider.query.filter_by(provider_id=provider_id).first()
    if not info_provider:
        return jsonify({"error": "InfoProvider data not found"}), 404
    
    try:
        # Return the serialized InfoProvider data
        return jsonify(info_provider.serialize()), 200
    except exc.SQLAlchemyError:
        return jsonify({"error": "Failed to fetch InfoProvider data"}), 500



####### POST
@api.route("/info_provider", methods=["POST"])
@jwt_required()
def create_info_provider():
    current_provider_id = get_jwt_identity()
    
    body = request.get_json()

    # Validate and retrieve the provider_id
    provider_id = current_provider_id
    if provider_id is None:
        return jsonify({"error": "Missing provider ID"}), 400

    # Fetch the provider based on the provided provider_id
    provider = Provider.query.filter_by(id=provider_id).first()
    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    # Create a new InfoProvider instance
    new_info_provider = InfoProvider(
        gender=body.get("gender"),
        day=body.get("day"),
        month=body.get("month"),
        year=body.get("year"),
        morning=body.get("morning"),
        afternoon=body.get("afternoon"),
        evening=body.get("evening"),
        pet_sitter=body.get("pet_sitter"),
        dog_walker=body.get("dog_walker"),
        house_sitter=body.get("house_sitter"),
        pet_groomer=body.get("pet_groomer"),
        number_of_pets=body.get("number_of_pets"),
        description=body.get("description"),
        address=body.get("address"),
        phone=body.get("phone"),
        payment_method=body.get("paymentMethod"),
        provider_id=provider_id,
    )
       
    try:
        # Save the new InfoProvider instance to the database
        db.session.add(new_info_provider)
        db.session.commit()
        return jsonify(new_info_provider.serialize()), 201
    except exc.SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "Failed to create info provider"}), 500


######## PUT
@api.route("/info_provider-edit", methods=["PUT"])
@jwt_required()
def update_provider():
    current_provider_id = get_jwt_identity()
    provider = Provider.query.filter_by(id=current_provider_id).first()
    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    body = request.get_json()

    # Update the Provider information
    provider.name = body.get("name", provider.name)
    provider.surname = body.get("surname", provider.surname)
    provider.email = body.get("email", provider.email)
    provider.username = body.get("username", provider.username)
    provider.password = body.get("password", provider.password)
    provider.country = body.get("country", provider.country)
    db.session.commit()

    # Check if the Provider has an associated InfoProvider
    info_provider = InfoProvider.query.filter_by(provider_id=provider.id).first()
    if info_provider:
        # Update the InfoProvider information
        # Update the InfoProvider information
       info_provider.day = body.get("day", info_provider.day)
       info_provider.month = body.get("month", info_provider.month)
       info_provider.year = body.get("year", info_provider.year)
       info_provider.gender = body.get("gender", info_provider.gender)
       info_provider.morning = body.get("morning", info_provider.morning)
       info_provider.afternoon = body.get("afternoon", info_provider.afternoon)
       info_provider.evening = body.get("evening", info_provider.evening)
       info_provider.pet_sitter = body.get("pet_sitter", info_provider.pet_sitter)
       info_provider.house_sitter = body.get("house_sitter", info_provider.house_sitter)
       info_provider.dog_walker = body.get("dog_walker", info_provider.dog_walker)
       info_provider.pet_groomer = body.get("pet_groomer", info_provider.pet_groomer)
       info_provider.number_of_pets = body.get("number_of_pets", info_provider.number_of_pets)
       info_provider.description = body.get("description", info_provider.description)
       info_provider.address = body.get("address", info_provider.address)
       info_provider.phone = body.get("phone", info_provider.phone)
       info_provider.payment_method = body.get("paymentMethod", info_provider.payment_method)
       db.session.commit()


    # Serialize the updated Provider object along with associated InfoProvider information
    serialized_provider = provider.serialize()
    if info_provider:
        serialized_provider["info_provider"] = info_provider.serialize()

    return jsonify(serialized_provider), 200





######## DELETE
@api.route("/info_provider", methods=["DELETE"])
@jwt_required()
def delete_provider():
    current_provider_id = get_jwt_identity()
    provider = Provider.query.filter_by(id=current_provider_id).first()
    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    # Delete the associated InfoProvider if it exists
    info_provider = provider.info_provider
    if info_provider:
        db.session.delete(info_provider)

    # Delete the Provider
    db.session.delete(provider)
    db.session.commit()

    return jsonify({"message": "Provider deleted successfully"}), 200




################ LOGIN / LOGOUT ###################
def verificacionToken(jti):
    jti  # Identificador del JWT (es más corto)
    print("jit", jti)
    token = TokenBlockedList.query.filter_by(token=jti).first()
    if token is None:
        return False
    return True


blacklist = set()

####LOGIN
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
        user_id = user.id
        access_token = create_access_token(identity=user_id)
        print("User ID:", user_id)
        print("Access Token:", access_token)
        return (
            jsonify(
                {
                    "message": "Logged in successfully",
                    "access_token": access_token,
                    "id": user_id,
                }
            ),
            200,
        )
    else:
        provider_id = provider.id
        access_token = create_access_token(identity=provider_id)
        print("Provider ID:", provider_id)
        print("Access Token:", access_token)
        return (
            jsonify(
                {
                    "message": "Logged in successfully",
                    "access_token": access_token,
                    "provider_id": provider_id,
                }
            ),
            200,
        )

########## LOGOUT
@api.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    blacklist.add(jti)
    return jsonify({"message": "Log out successfully"}), 200

#########PROTECTED 
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


@api.route("/chatgpt", methods=["POST"])
def open_ai():
    body = request.get_json()
    prompt = (
        "You're a website named Onlypaws that offers pet sitting and house sitting services for pet parents, along other features like pet playdates, grooming, dog walker and tips how to care for different types of pets  "
        + body["prompt"]
    )
    completion = openai.Completion.create(
        engine="text-davinci-003", prompt=prompt, n=1, max_tokens=2048
    )
    print(completion.choices[0])
    print(completion.choices[0].text)
    dictionary = {"reply": completion.choices[0].text}
    return jsonify(dictionary), 200


#################IMG UPLOAD##############
@api.route("/upload", methods=["POST"])
@jwt_required()
def handle_upload():
    if "image" not in request.files:
        raise APIException("No image to upload")

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    provider = Provider.query.get(current_user_id)  # Retrieve the provider based on the current user ID

    if not user and not provider:
        raise APIException("User or provider not found", status_code=404)

    image_file = request.files["image"]

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    public_id = f'sample_folder/profile/my-image-name_{timestamp}'

    try:
        # Upload image to Cloudinary
        result = cloudinary.uploader.upload(
            image_file,
            public_id=public_id,
            crop="limit",
            width=450,
            height=450,
            eager=[
                {
                    "width": 200,
                    "height": 200,
                    "crop": "thumb",
                    "gravity": "face",
                    "radius": 100,
                },
            ],
            tags=["profile_picture"],
        )

        if user:
            # Create a new Image record associated with the user in the database
            my_image = Image(ruta=result["secure_url"], user=user)
        else:
            # Create a new Image record associated with the provider in the database
            my_image = Image(ruta=result["secure_url"], user= None, provider = provider)
            #my_image = Image(ruta=result["secure_url"], provider=provider)

        db.session.add(my_image)
        db.session.commit()

        return jsonify(my_image.serialize()), 200

    except Exception as e:
        raise APIException(f"Failed to upload image: {str(e)}", status_code=500)




#### GET IMG - USER ROLE
@api.route('/profile_picture/users', methods=['GET'])
@jwt_required()
def get_user_profile_picture():
    user_id = get_jwt_identity()
    my_image = Image.query.filter_by(user_id=user_id).first()
    if not my_image:
        raise APIException("User profile picture not found", status_code=404)

    # Include the user identifier in the response
    user = User.query.get(user_id)
    if not user:
        raise APIException("User not found", status_code=404)

    return jsonify({
        "userId": user.id,
        "username": user.username,
        "profilePictureUrl": my_image.ruta
    }), 200




##### GET IMG - PROVIDER ROLE

@api.route('/profile_picture/providers', methods=['GET'])
@jwt_required()
def get_provider_profile_picture():
    provider_id = get_jwt_identity()
    my_image = Image.query.filter_by(provider_id=provider_id).first()
    if not my_image:
        raise APIException("Provider profile picture not found", status_code=404)
    
    provider = Provider.query.get(provider_id)
    if not provider:
        raise APIException("Provider not found", status_code=404)

    return jsonify({
        "providerID": provider.id,
        "username": provider.username,
        "providerProfilePictureUrl": my_image.ruta
    }), 200



###### IMG LIST


@api.route("/image-list", methods=["GET"])
def handle_image_list():
    images = Image.query.all()  # Objeto de SQLAlchemy
    images = list(map(lambda item: item.serialize(), images))

    response_body = {"lista": images}
    return jsonify(response_body), 200

######### FORGOT PASSWORD ###########
@api.route("/forgot-password", methods=["POST"])
def forgot_password():
    email = request.json.get("email")
    
    # Check if the email exists in the User table
    user = User.query.filter_by(email=email).first()
    if user:
        # Generate a token for resetting the user's password
        serializer = URLSafeTimedSerializer(app.secret_key)
        token = serializer.dumps(email, salt="reset-password")
        # Send the email with the password reset link
        subject = "Reset Your Password"
        reset_link = url_for("api.reset_password", token=token, _external=True)
        message = f"Please click the following link to reset your password: {reset_link}"
        sendEmail(message, email, subject)
        return jsonify({"message": "Password reset link sent"}), 200
    
    # Check if the email exists in the Provider table
    provider = Provider.query.filter_by(email=email).first()
    if provider:
        # Generate a token for resetting the provider's password
        serializer = URLSafeTimedSerializer(app.secret_key)
        token = serializer.dumps(email, salt="reset-password")
        # Send the email with the password reset link
        subject = "Reset Your Password"
        reset_link = url_for("api.reset_password", token=token, _external=True)
        message = f"Please click the following link to reset your password: {reset_link}"
        sendEmail(message, email, subject)
        return jsonify({"message": "Password reset link sent"}), 200
    
    # If the email is not found in either User or Provider table
    return jsonify({"message": "Email not found"}), 404

################ RESET PASSWORD not in used as of the moment 
@api.route("/reset-password", methods=["POST"])
def reset_password():
    token = request.json.get("token")
    password = request.json.get("password")
    serializer = URLSafeTimedSerializer(app.secret_key)
    try:
        email = serializer.loads(token, salt="reset-password", max_age=3600)  # El token es válido durante 1 hora
    except:
        return jsonify({"message": "Invalid or expired token"}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    # Actualizar la contraseña del usuario
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    user.password = hashed_password
    db.session.commit()
    return jsonify({"message": "Password reset successful"}), 200




###### CONTACT US EMAIL 
@api.route('/send-email', methods=['POST'])
def send_contact_email():
    try:
        body = request.get_json()
        fullname = body['fullname']
        email = body['email']
        phone = body['phone']
        subject = body['subject']
        message = body['message']

        sendEmail(message, 'onlypawscompany@gmail.com', f'Contact Form Submission - {subject}')
        return jsonify({'message': 'Email sent successfully!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

