import pandas as pd 
import seaborn as sns


def get_web_data(mx):
	df = pd.read_csv('data.csv')
	df = df.head(mx)
	return df

def get_donut_data():
	df = sns.load_dataset('penguins')
	df = df.groupby(['species','island']).size().reset_index()
	df.rename({0: 'rows'},axis=1,inplace=True)
	return df

def get_detail_data(species,island):
	df = sns.load_dataset('penguins')
	return df[(df.species == species) & (df.island == island)]






