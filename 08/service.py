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
	mx = int(request.args.get('max'))
	data = pd.read_csv('data.csv').head(mx)
	#app.logger.info('%d logged in successfully ' + str())
	return data.to_json()

app.run()




