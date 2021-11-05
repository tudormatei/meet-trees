from flask import Flask, request, jsonify
import numpy as np
import os
from PIL import Image
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'

db = SQLAlchemy(app)

class User(db.Model):
    _id = db.Column("id", db.Integer, primary_key=True)
    username = db.Column("username", db.String(15), unique=True)
    password = db.Column("password", db.String(100), unique=True)

    def __init__(self, username, password):
        self.username = username
        self.password = password



def check_code(content):
    for item in content:
        print(f"code is {item['code']}")

    return True


@app.route('/')
def index():
    return '<h1>FLASK APP IS RUNNING!</h1>'


@app.route('/api/register', methods=['POST'])
def register():
    content = request.get_json(force=True)
    username = content['username']
    password = content['password']

    found_user = User.query.filter_by(username=username).first()
    if not found_user:
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        print('username is not taken, inserted into database')
        return {'status':'ok'}
    else:
        print('username is taken')
        return {'status':'not'}


@app.route('/api/login', methods=['POST'])
def login():
    content = request.get_json(force=True)
    username = content['username']
    password = content['password']

    found_user = User.query.filter_by(username=username).first()
    found_password = User.query.filter_by(password=password).first()
    if found_user and found_password:
        print('login successful')
        return {'status':'ok'}
    else:
        print('cant login')
        return {'status':'not'}


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)