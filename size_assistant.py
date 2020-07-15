import pandas as pd
import numpy as np
import glob

df = pd.concat([pd.read_csv(f) for f in glob.glob('datasets/NHANES*.csv')])
df = df[df[['BMXHT', 'BMXWT','BMXWAIST']].notnull().all(1)]
df = df[['SEQN','BMXHT', 'BMXWT','BMXWAIST']]

demo_df = pd.concat([pd.read_csv(f) for f in glob.glob('datasets/Demo*.csv')])
demo_df = demo_df[['SEQN','RIAGENDR']]

final_df = pd.merge(df, demo_df, on='SEQN', how='inner')

print(final_df)
