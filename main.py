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

    dateStart = db.Column("dateStart", db.String(15), unique=False)
    hourStart = db.Column("hourStart", db.String(15), unique=False)
    dateEnd = db.Column("dateEnd", db.String(15), unique=False)
    hourEnd = db.Column("hourEnd", db.String(15), unique=False)

    email = db.Column("email", db.String(20), unique=False)
    points = db.Column("points", db.String(20), nullable=True)

    codes = db.Column("codes", db.PickleType, nullable=True)
    location_saplings = db.Column("location_saplings", db.String(100), unique=False)
    remainingCodes = db.Column("remainingCodes", db.String(15), unique=False)


    def __init__(self, name, location, dateStart, hourStart, dateEnd, hourEnd, codes, location_saplings, remainingCodes, email):
        self.name = name
        self.tag = 'event'
        self.location = location

        self.dateStart = dateStart
        self.hourStart = hourStart
        self.dateEnd = dateEnd
        self.hourEnd = hourEnd

        self.codes = codes
        self.location_saplings = location_saplings
        self.remainingCodes = remainingCodes

        self.email = email


@app.route('/')
def index():
    return '<h1>FLASK APP IS RUNNING!</h1>'


@app.route('/api/events', methods=['GET'])
def get_event_data():
    events = Events.query.filter_by(tag='event').all()

    list = []

    for event in events:
        dict = {}
        dict[event._id] = [event.name, event.location, event.dateStart, event.hourStart, event.dateEnd, event.hourEnd, event.codes, event.location_saplings, event.remainingCodes, event.email, event._id]
        list.append(dict)

    return jsonify(list)


def create_codes(codenr):
    codes = []
    str = ''
    for y in range(codenr):
        for x in range(8):
            nr = random.randint(0,9)
            str = f"{str}{nr}"
        codes.append(   str)
        str = ''

    return codes


@app.route('/api/create', methods=['POST'])
def create_event():
    content = request.get_json(force=True)

    name = content['name']
    location = content['location']
    codenr = content['codenr']
    location_saplings = content['locationsaplings']

    dateStart = content['datestart']
    hourStart = content['hourstart']
    dateEnd = content['dateend']
    hourEnd = content['hourend']

    email = content['email']

    exists = Events.query.filter_by(name=name).first()

    codes_arr = create_codes(int(codenr))

    if not exists:
        event = Events(name, location, dateStart, hourStart, dateEnd, hourEnd, codes_arr, location_saplings, len(codes_arr), email)
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
    email = content['email']


    all_codes = Events.query.filter_by(name=name).first()
    all_codes = all_codes.codes


    if len(code) != len(set(code)):
        return {"status":"not"}


    bool = None
    for y_code in code:
        bool = False
        for x_code in all_codes:
            if y_code != x_code:
                bool = False
            else:
                bool = True
                break
        if bool == False:
            return {"status":"not"}


    email = Events.query.filter_by(email=email).first()
    if email:
        if email.points == None:
            email.points = '0'
            db.session.commit()

        result = int(email.points) + len(code)
        email.points = f"{result}"
        db.session.commit()
    else:
        print('email is not yet registered must create event first')
        return {"status":"ok","email":"1"}

    return {"status":"ok", "email":email.points}


@app.route('/api/update', methods=['POST'])
def update_event():
    content = request.get_json(force=True)

    name = content['name']
    amount = content['amount']

    event = Events.query.filter_by(name=name).first()
    
    if int(event.remainingCodes) - int(amount) >= 0:
        result = int(event.remainingCodes) - int(amount)
        event.remainingCodes = f"{result}"
        db.session.commit()
        return {'status':'ok','remainingCodes':event.remainingCodes}
    else:
        print(event.remainingCodes)
        return {'status':'no'}
        

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)