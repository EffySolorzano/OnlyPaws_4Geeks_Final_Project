"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

api = Blueprint('api', __name__)

EMAIL = os.environ.get('EMAIL')
PASSWORD = os.environ.get('PASSWORD')


def sendEmail(message, to, subject):
    smtp_address = 'smtp.gmail.com'
    smtp_port = 465 #SSL
    
    print(message, to, subject)

    messageMime = MIMEMultipart('alternative') #JSON, text, application/pdf
    messageMime['Subject'] = subject
    messageMime['To'] = to
    messageMime['From'] = EMAIL

    html = '''
    <html>
    <body>
    <h1> Hi, ''' + to + ''' </h1>
    </body>
    </html>
    '''

    #Crear elementos MIMEText
    text_mime = MIMEText(subject, 'plain')
    html_mime = MIMEText(html, 'html')

    #Adjuntar los MIMEText al MIMEMultipart
    messageMime.attach(text_mime)
    messageMime.attach(html_mime)

    #Conectarnos al puerto 465 de GMAIL para enviar al correo
    context = ssl.create_default_context()
    emailFrom = EMAIL
    password = PASSWORD
    with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:
        server.login(emailFrom, password)
        server.sendmail(emailFrom, to, messageMime.as_string())

    return jsonify({"message":"email sent"}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/email', methods=['POST'])
def handle_email():
    body = request.get_json()
    message = body['message']
    to = body['to']
    subject = body['subject']

    sendEmail(message, to, subject)

    return jsonify({'message':'email sent'}), 200