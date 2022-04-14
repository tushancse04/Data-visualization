import flask
import pandas as pd
from flask import jsonify
from flask_cors import CORS,cross_origin
from flask import request
from web_data import *

app = flask.Flask('service')
app.config["DEBUG"] = True
CORS(app)

@app.route('/home',methods=['GET'])
def home():
	mx = int(request.args.get('max'))
	app.logger.info(mx)
	data = pd.read_csv('data.csv').head(mx)
	#app.logger.info('%d logged in successfully ' + str())
	return data.to_json()


@app.route('/data',methods=['GET'])
def get_data():
	mx = int(request.args.get('max'));
	app.logger.info(mx)
	return get_web_data(mx).to_json()


@app.route('/car_data',methods=['GET'])
def car_data():
	mx = int(request.args.get('max'));
	app.logger.info(mx)
	return get_car_data(mx).to_json()


@app.route('/penguin_data',methods=['GET'])
def penguin_data():
	id = int(request.args.get('id'));
	return get_penguins_data()

app.run()




