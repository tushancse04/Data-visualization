import pandas as pd 

def get_web_data(mx):
	df = pd.read_csv('data.csv')
	df = df.head(mx)
	return df


