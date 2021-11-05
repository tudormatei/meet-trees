from flask import Flask, request, jsonify
import numpy as np
import os
from PIL import Image

app = Flask(__name__)


def check_code(content):
    for item in content:
        print(f"code is {item['code']}")

    return True


@app.route('/')
def index():
    return '<h1>FLASK APP IS RUNNING!</h1>'


@app.route('/api/result', methods=['POST'])
def result():
    content = request.json

    return jsonify(check_code(content))


if __name__ == '__main__':
    app.run(debug=True)