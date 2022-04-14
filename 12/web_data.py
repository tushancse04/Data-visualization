import pandas as pd 
import seaborn as sns


def get_web_data(mx):
	df = pd.read_csv('data.csv')
	df = df.head(mx)
	return df

def get_car_data(mx):
	df = pd.read_csv('auto-mpg.csv')
	df = df.head(mx)
	return df

def get_group_bar_data():
	df = pd.read_json('data.json')
	return df


def get_iris_data():
	df = sns.load_dataset('iris')
	return df.head(5)



