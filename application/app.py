from flask import Flask
from flask import render_template
from flask import jsonify


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/pets/<id>')
def pets(id):
    pets = {
        'pets': [
            {
              "id": 1,
              "name": "dog"
            },
            {
              "id": 2,
              "name": "cat"
            },
            {
              "id": 3,
              "name": "lizard"
            },
            {
              "id": 4,
              "name": "saber toothed tiger"
            }
        ]
    }
    return jsonify(**pets)


@app.route('/colors/<id>')
def colors(id):
    colors = {
        'colors': [
            {
              "id": 1,
              "name": "blue"
            },
            {
              "id": 2,
              "name": "red"
            },
            {
              "id": 3,
              "name": "green"
            },
            {
              "id": 4,
              "name": "pink"
            }
        ]
    }
    return jsonify(**colors)


@app.route('/foods/<id>')
def foods(id):
    foods = {
        'foods': [
            {
                'id': 1,
                'parent_id': None,
                'name': 'Pizza'
            },
            {
                'id': 2,
                'parent_id': 1,
                'name': 'Cheese Pizza'
            },
            {
                'id': 3,
                'parent_id': 1,
                'name': 'Combo Pizza'
            },
            {
                'id': 4,
                'parent_id': None,
                'name': 'Burgers'
            },
            {
                'id': 5,
                'parent_id': 4,
                'name': 'Cheese Burgers'
            },
            {
                'id': 6,
                'parent_id': 4,
                'name': 'Hamburgers'
            },
            {
                'id': 7,
                'parent_id': None,
                'name': 'Pasta'
            },
        ]
    }
    return jsonify(**foods)