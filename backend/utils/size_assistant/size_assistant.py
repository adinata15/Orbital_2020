import pandas as pd
import numpy as np
import glob
import sys
import os
from sklearn.linear_model import LinearRegression 

data = sys.argv[1:]
for i in range(len(data)):
    data[i] = float(data[i])

if data[2] == 0:
    chest_df = pd.read_csv(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'datasets', 'CHEST_NHANES_2009_2010.csv'))
    chest_df = chest_df[chest_df['ARXCCEX'].notnull()]
    chest_df = chest_df[['SEQN', 'ARXCCEX']]

    demo_09_10 = pd.read_csv(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'datasets','Demo_2009_2010.csv'))
    demo_09_10 = demo_09_10[['SEQN','RIAGENDR']]

    nhanes_df = pd.read_csv(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'datasets','NHANES_2009_2010.csv'))
    nhanes_df = nhanes_df[nhanes_df[['BMXHT', 'BMXWT']].notnull().all(1)]
    nhanes_df = nhanes_df[['SEQN','BMXHT', 'BMXWT']]

    final_chest_df = pd.merge(chest_df, demo_09_10, on='SEQN', how='inner')
    final_chest_df = pd.merge(final_chest_df, nhanes_df, on='SEQN', how='inner')
    final_chest_df = final_chest_df[['BMXHT', 'BMXWT', 'ARXCCEX', 'RIAGENDR']]

    final_chest_df_male = final_chest_df[final_chest_df['RIAGENDR'] == 1]
    final_chest_df_female = final_chest_df[final_chest_df['RIAGENDR'] == 2]

    if data[3] == 1:
        male_chest_input = final_chest_df_male[['BMXHT', 'BMXWT']].to_numpy()
        male_chest_output = final_chest_df_male['ARXCCEX'].to_numpy()
        model = LinearRegression().fit(male_chest_input, male_chest_output)
        pred = model.predict(np.array(data[:2]).reshape((-1,2)))
        print(pred)

    else:
        female_chest_input = final_chest_df_female[['BMXHT', 'BMXWT']].to_numpy()
        female_chest_output = final_chest_df_female['ARXCCEX'].to_numpy()
        model = LinearRegression().fit(female_chest_input, female_chest_output)
        pred = model.predict(np.array(data[:2]).reshape((-1,2)))
        print(pred)
    
else:
    df = pd.concat([pd.read_csv(f) for f in glob.glob(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'datasets','NHANES*.csv'))], sort = True)
    df = df[df[['BMXHT', 'BMXWT','BMXWAIST']].notnull().all(1)]
    df = df[['SEQN','BMXHT', 'BMXWT','BMXWAIST']]

    demo_df = pd.concat([pd.read_csv(f) for f in glob.glob(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'datasets','Demo*.csv'))], sort = True)
    demo_df = demo_df[['SEQN','RIAGENDR']]

    final_df = pd.merge(df, demo_df, on='SEQN', how='inner')
    final_df = final_df[['BMXHT', 'BMXWT','BMXWAIST','RIAGENDR']]

    final_df_male = final_df[final_df['RIAGENDR'] == 1]
    final_df_female = final_df[final_df['RIAGENDR'] == 2]

    if data[3] == 1:
        male_waist_input = final_df_male[['BMXHT', 'BMXWT']].to_numpy()
        male_waist_output = final_df_male['BMXWAIST'].to_numpy()
        model = LinearRegression().fit(male_waist_input, male_waist_output)
        pred = model.predict(np.array(data[:2]).reshape((-1,2)))
        print(pred)

    else:
        female_waist_input = final_df_female[['BMXHT', 'BMXWT']].to_numpy()
        female_waist_output = final_df_female['BMXWAIST'].to_numpy()
        model = LinearRegression().fit(female_waist_input, female_waist_output)
        pred = model.predict(np.array(data[:2]).reshape((-1,2)))
        print(pred)
