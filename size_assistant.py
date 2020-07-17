import pandas as pd
import numpy as np
import glob
from sklearn.linear_model import LinearRegression 

# df = pd.concat([pd.read_csv(f) for f in glob.glob('datasets/NHANES*.csv')], sort = True)
# df = df[df[['BMXHT', 'BMXWT','BMXWAIST']].notnull().all(1)]
# df = df[['SEQN','BMXHT', 'BMXWT','BMXWAIST']]

# demo_df = pd.concat([pd.read_csv(f) for f in glob.glob('datasets/Demo*.csv')], sort = True)
# demo_df = demo_df[['SEQN','RIAGENDR']]

# final_df = pd.merge(df, demo_df, on='SEQN', how='inner')
# final_df = final_df[['BMXHT', 'BMXWT','BMXWAIST','RIAGENDR']]

# final_df_male = final_df[final_df['RIAGENDR'] == 1]
# final_df_female = final_df[final_df['RIAGENDR'] == 2]

# print(final_df)
# print(final_df_male)
# print(final_df_female)

chest_df = pd.read_csv('datasets/CHEST_NHANES_2009_2010.csv')
chest_df = chest_df[chest_df['ARXCCEX'].notnull()]
chest_df = chest_df[['SEQN', 'ARXCCEX']]

demo_09_10 = pd.read_csv('datasets/Demo_2009_2010.csv')
demo_09_10 = demo_09_10[['SEQN','RIAGENDR']]

nhanes_df = pd.read_csv('datasets/NHANES_2009_2010.csv')
nhanes_df = nhanes_df[nhanes_df[['BMXHT', 'BMXWT']].notnull().all(1)]
nhanes_df = nhanes_df[['SEQN','BMXHT', 'BMXWT']]

final_chest_df = pd.merge(chest_df, demo_09_10, on='SEQN', how='inner')
final_chest_df = pd.merge(final_chest_df, nhanes_df, on='SEQN', how='inner')
final_chest_df = final_chest_df[['BMXHT', 'BMXWT', 'ARXCCEX', 'RIAGENDR']]

final_chest_df_male = final_chest_df[final_chest_df['RIAGENDR'] == 1]
final_chest_df_female = final_chest_df[final_chest_df['RIAGENDR'] == 2]

print(final_chest_df)
print(final_chest_df_male)
print(final_chest_df_female)

# print('---------------------')

# male_waist_input = final_df_male[['BMXHT', 'BMXWT']].to_numpy()
# print(male_waist_input)
# print(len(male_waist_input))

# male_waist_output = final_df_male['BMXWAIST'].to_numpy()
# print(male_waist_output)
# print(len(male_waist_output))

# model = LinearRegression().fit(male_waist_input, male_waist_output)
# male_waist_r_sq = model.score(male_waist_input, male_waist_output)
# print(male_waist_r_sq)

# pred = model.predict(male_waist_input)
# print('Prediction: ', pred)

# print('---------------------')

# female_waist_input = final_df_female[['BMXHT', 'BMXWT']].to_numpy()
# print(female_waist_input)
# print(len(female_waist_input))

# female_waist_output = final_df_female['BMXWAIST'].to_numpy()
# print(female_waist_output)
# print(len(female_waist_output))

# model = LinearRegression().fit(female_waist_input, female_waist_output)
# female_waist_r_sq = model.score(female_waist_input, female_waist_output)
# print(female_waist_r_sq)

# pred = model.predict(female_waist_input)
# print('Prediction: ', pred, sep='\n')

print('---------------------')

female_chest_input = final_chest_df_female[['BMXHT', 'BMXWT']].to_numpy()
print(female_chest_input)
print(len(female_chest_input))

female_chest_output = final_chest_df_female['ARXCCEX'].to_numpy()
print(female_chest_output)
print(len(female_chest_output))

model = LinearRegression().fit(female_chest_input, female_chest_output)
female_chest_r_sq = model.score(female_chest_input, female_chest_output)
print(female_chest_r_sq)

pred = model.predict(female_chest_input)
print('Prediction: ', pred, sep='\n')

print('---------------------')

male_chest_input = final_chest_df_male[['BMXHT', 'BMXWT']].to_numpy()
print(male_chest_input)
print(len(male_chest_input))

male_chest_output = final_chest_df_male['ARXCCEX'].to_numpy()
print(male_chest_output)
print(len(male_chest_output))

model = LinearRegression().fit(male_chest_input, male_chest_output)
male_chest_r_sq = model.score(male_chest_input, male_chest_output)
print(male_chest_r_sq)

pred = model.predict(np.array([170, 61]).reshape((-1,2)))
print('Prediction: ', pred, sep='\n')
