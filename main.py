from flask import Flask, request, jsonify
import numpy as np
import os
from PIL import Image
from flask_sqlalchemy import SQLAlchemy

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


    def __init__(self, name, location, date):
        self.name = name
        self.tag = 'event'
        self.location = location
        self.date = date


@app.route('/')
def index():
    return '<h1>FLASK APP IS RUNNING!</h1>'


@app.route('/api/events', methods=['GET'])
def get_event_data():
    # name = Events('event2', 'loc2')
    # db.session.add(name)
    # db.session.commit()

    # return 'muie'

    events = Events.query.filter_by(tag='event').all()

    # # dict = {}
    # # index = 1
    # # for event in events:
    # #     dict[index] = event.name
    # #     index = index + 1
    # #     print(event.name)

    list = []
    for event in events:
        dict = {}
        dict[event._id] = [event.name, event.location, event.date]
        list.append(dict)

    return jsonify(list)


@app.route('/api/create', methods=['POST'])
def create_event():
    content = request.get_json(force=True)
    name = content['name']
    location = content['location']
    date = content['date']

    exists = Events.query.filter_by(name=name).first()
    if not exists:
        event = Events(name, location, date)
        db.session.add(event)
        db.session.commit()
        
        print('doesnt exist')
        return {'status':'ok'}
    else:
        print('event exists')
        return {'status':'not okay'}


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)