import pandas as pd 
import seaborn as sb

def get_web_data(mx):
	df = pd.read_csv('data.csv')
	df = df.head(mx)
	return df

def get_car_data(mx):
	df = pd.read_csv('auto-mpg.csv')
	df = df.head(mx)
	return df

def get_iris_data():
	df = sb.load_dataset('iris')
	return df.head(10)

def get_ir_data():
	df = pd.read_csv('DFF.csv')
	df = df.head(5)
	return df


