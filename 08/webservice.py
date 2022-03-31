import flask
from flask_cors import CORS,cross_origin
import pandas as pd
from flask_cors import CORS,cross_origin

app = flask.Flask('webservice')
app.config['DEBUG'] = True
CORS(app)


@app.route('/home',methods=['GET'])
def home():
	return '<h1> Hello World!</h1>'

app.run()