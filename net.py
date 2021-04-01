import yfinance as yf
import pandas
from sklearn.linear_model import ElasticNet
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as pyplot

from sklearn.datasets import make_regression
import numpy as np
import pandas as pd


#reg = linear_model.LassoLars(alpha=.1)

#reg.fit([[0, 0], [1, 1]], [0, 1])

costco = yf.download("TSLA", "2000-01-01", "2021-03-25", auto_adjust=True)
#sherwin = yf.download("SHW", "2010-01-01", "2020-09-01", auto_adjust=True)
#hershey = yf.download("HSY", "2010-01-01", "2020-09-01", auto_adjust=True)
#sherwin = sherwin[["Close"]]
#sherwin = sherwin.dropna()
costco = costco[["Close"]]
costco = costco.dropna()
#print(costco)

#costco.Close.plot(figsize = (8,5),color = 'b')
#pyplot.ylabel("Stock Price")

costco["fiveAVG"] = costco["Close"].rolling(window=5).mean()
costco["twentyAVG"] = costco["Close"].rolling(window=20).mean()
costco["valueNextDay"] = costco["Close"].shift(-1)
costco = costco.dropna();
print(costco)
X = costco[["fiveAVG","twentyAVG"]]

y = costco["valueNextDay"]
costco = costco.dropna();

split_index = 0.8

split_index = split_index * len(costco)
split_index = int(split_index)

#split the data by the split index so 80 percent training and 20 to test on
x_train = X[:split_index]
y_train = y[:split_index]

x_test = X[split_index:]
y_test = y[split_index:]
#y_test2 = sherwin[split_index:]
shersplit = []

elasticModel = ElasticNet()
#linearModel = LinearRegression()

elasticModel = elasticModel.fit(x_train, y_train)
#linearModel = linearModel.fit(x_train, y_train)

#feature coefficients
fiveDayAVG = elasticModel.coef_[0]
twentyDayAVG = elasticModel.coef_[1]

elastic_output = elasticModel.predict(x_test)
#linear_output = linearModel.predict(x_test)

elastic_output = pandas.DataFrame(elastic_output, index = y_test.index, columns=["value"])
#linear_output = pandas.DataFrame(linear_output, index = y_test.index, columns=["value"])

elastic_output.plot()
#linear_output.plot()
y_test.plot()

pyplot.show()

print(fiveDayAVG)
print(twentyDayAVG)



#note: check to see if x_test and y_test are the same size before using dataframe
#print(x_test)
#print(y_test)

#regr = ElasticNet(random_state=0)
#regr.fit(X, y)
#ElasticNet(random_state=0)

#
# print(regr.coef_)
# print(regr.intercept_)
# print(regr.predict([[0, 0]]))

