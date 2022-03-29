import flask
import pandas as pd
from flask import jsonify
from flask_cors import CORS,cross_origin
from flask import request

app = flask.Flask('service')
app.config["DEBUG"] = True
CORS(app)

@app.route('/home',methods=['GET'])
def home():
	data = pd.read_csv('data.csv')
	app.logger.info('%d logged in successfully ' + str(request.args.get('id')))
	return data.to_json()

app.run()




