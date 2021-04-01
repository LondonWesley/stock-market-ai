import numpy as np

import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

regressor = LinearRegression()

nof = X_train.shape[1]
print(nof)
mse = np.empty(2 ** nof - 1)
ind = np.empty(nof)
l = list()
bl = list()
bitem = list()
k = 0

# remaining = set(X_train.columns)
from itertools import combinations

remaining = set(X_train.columns)
for j in range(1, len(remaining) + 1):
    comb = combinations(remaining, j)
    tempbest = 5000

    for i in list(comb):
        lsti = list(i)
        print(list(i))
        l.append(lsti)
        # X_train.iloc[:,i]
        regressor.fit(X_train.loc[:, lsti], y_train)
        y_exp = regressor.predict(X_train.loc[:, list(i)])
        mse[k] = mean_squared_error(y_train, y_exp) * y_train.shape[0] / (y_train.shape[0] - len(list(i)))
        if mse[k] < tempbest:
            bitem = lsti
            tempbest = mse[k]
        k = k + 1

    bl.append(bitem)