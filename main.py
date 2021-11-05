from flask import Flask, request, jsonify
import numpy as np
import os
from PIL import Image
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'

db = SQLAlchemy(app)

# class users(db.Model):
#     _id = db.Column("id", db.Integer, primary_key=True)
#     name = db.Column("name", db.String(15))
#     name = db.Column("password", db.String(100))

#     def __init__(self, name, password):



def check_code(content):
    for item in content:
        print(f"code is {item['code']}")

    return True


@app.route('/')
def index():
    return '<h1>FLASK APP IS RUNNING!</h1>'


@app.route('/api/register', methods=['POST'])
def register():
    content = request.json
    username = content['username']
    password = content['password']

    return jsonify(f' REGISTER: username is {username}, password is {password}')


@app.route('/api/login', methods=['POST'])
def login():
    content = request.get_json(force=True)
    username = content['username']
    password = content['password']

    return jsonify(f'LOGIN: username is {username}, password is {password}')


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)