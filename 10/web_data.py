import pandas as pd 
import seaborn as sns


def get_web_data(mx):
	df = pd.read_csv('data.csv')
	df = df.head(mx)
	return df



def get_penguins_data():
	df = sns.load_dataset('penguins')
	return df[df.island == 'Torgersen'].to_html()




