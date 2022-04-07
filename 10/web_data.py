import pandas as pd 

def get_web_data(mx):
	df = pd.read_csv('data.csv')
	df = df.head(mx)
	return df

def get_car_data(mx):
	df = pd.read_csv('auto-mpg.csv')
	df = df.head(mx)
	return df


