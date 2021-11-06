from flask import Flask, request, jsonify
import numpy as np
import os
from PIL import Image
from flask_sqlalchemy import SQLAlchemy
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'

db = SQLAlchemy(app)

class Events(db.Model):
    _id = db.Column("id", db.Integer, primary_key=True)
    name = db.Column("name", db.String(15), unique=True)
    tag = db.Column("tag", db.String(15), unique=False)
    location = db.Column("location", db.String(15), unique=False)
    date = db.Column("date", db.String(15), unique=False)
    codes = db.Column("codes", db.PickleType, nullable=True)


    def __init__(self, name, location, date, codes):
        self.name = name
        self.tag = 'event'
        self.location = location
        self.date = date
        self.codes = codes


@app.route('/')
def index():
    return '<h1>FLASK APP IS RUNNING!</h1>'


@app.route('/api/events', methods=['GET'])
def get_event_data():
    events = Events.query.filter_by(tag='event').all()

    list = []

    for event in events:
        dict = {}
        dict[event._id] = [event.name, event.location, event.date, event.codes]
        list.append(dict)

    return jsonify(list)


def create_codes(codenr):
    codes = []
    str = ''
    for y in range(codenr):
        for x in range(8):
            nr = random.randint(0,9)
            str = f"{str}{nr}"
        codes.append(str)
        str = ''

    return codes


@app.route('/api/create', methods=['POST'])
def create_event():
    content = request.get_json(force=True)

    name = content['name']
    location = content['location']
    date = content['date']
    codenr = content['codenr']

    exists = Events.query.filter_by(name=name).first()

    codes_arr = create_codes(int(codenr))

    if not exists:
        event = Events(name, location, date, codes_arr)
        db.session.add(event)
        db.session.commit()
        
        print('doesnt exist')
        return {'status':'ok','codes':codes_arr}
    else:
        print('event exists')
        return {'status':'not okay'}



@app.route('/api/verify', methods=['POST'])
def verify():
    content = request.get_json(force=True)
    code = content['codes']
    name = content['name']

    all_codes = Events.query.filter_by(name=name).first()
    all_codes = all_codes.codes
    
    found = None
    for x_code in all_codes:
        found = False
        for y_code in code:
            if x_code == y_code:
                found = True
        if found == False:
            return {"status":"not"}

    return {"status":"ok"}


        

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)