import yfinance as yf
import pandas
from sklearn.linear_model import ElasticNet
from sklearn.linear_model import LinearRegression
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as pyplot
import numpy as np
import pandas as pd
from datetime import date
import os
import requests
import base64
from github import Github
from pprint import pprint


#reg = linear_model.LassoLars(alpha=.1)

#reg.fit([[0, 0], [1, 1]], [0, 1])

def updateOnGitHub(owner, csvFile, dataframe):
    cwd = os.getcwd()
    key = open(cwd + "/gitKey/GIT_TOKEN.txt")
    token = key.read()
   # query_url = f"https://api.github.com/repos/{owner}/{repo}/Stocks/" + stockCode + ".csv"
    github = Github(token)
    print(github.get_user().name)
    repo = github.get_user().get_repo("stock-market-ai")
    contents = repo.get_contents("Stocks/" + csvFile + ".csv")
    repo.update_file(contents.path, "stock info updated " + csvFile, dataframe.to_string(), contents.sha, branch="main")

class Predictor:
    def __init__(self, stockName):
        self.stockName = stockName

    def formatData(self, dataFrame):
        print("TODO:")

    def makePrediction(self):
        cwd = os.getcwd()

        currentDate = date.today()
        stock = yf.download(self.stockName, "2000-02-01", currentDate, auto_adjust=True)
        print(stock)
        stock = stock[["Close","Open"]]
        actualStock = stock
        stock = stock.dropna()
        #print(stock)

        stock["opening"] = stock["Open"]
        #stock["twentyAVG"] = stock["Close"].rolling(window=20).mean()
        #stock["earnings"] =
        #stock["dividend"] = yf.Ticker(self.stockName).dividends
        stock["valueNextDay"] = stock["Close"].shift(-1)
        pandas.set_option('display.max_rows', None)

        #print(stock)
        stock = stock.dropna()
        X = stock[["opening"]]

        y = stock["valueNextDay"]
        stock = stock.dropna()

        split_index = 0.8

        split_index = split_index * len(stock)
        split_index = int(split_index)

        #split the data by the split index so 80 percent training and 20 to test on
        x_train = X[:split_index]
        y_train = y[:split_index]

        x_test = X[split_index:]
        y_test = y[split_index:]

        elasticModel = ElasticNet()
        elasticModel = elasticModel.fit(x_train, y_train)

        #feature coefficients
        fiveDayAVG = elasticModel.coef_[0]
        #twentyDayAVG = elasticModel.coef_[1]

        elastic_output = elasticModel.predict(x_test)

        elastic_output = pandas.DataFrame(elastic_output, index = y_test.index, columns=["value"])
        elastic_output.to_csv (cwd + '/Stocks/'+ self.stockName + 'predicted.csv', index = False, header=True)
        #displaying the stock information

        #stock["Close"].plot()
        stock = yf.download(self.stockName, "2016-01-01", currentDate, auto_adjust=True)
        stock = stock[["Close"]]
        stock = stock.dropna()
        #updateOnGitHub("LondonWesley", self.stockName, stock)
        stock.to_csv(cwd + '/Stocks/' + self.stockName + '.csv', index=False, header=True)
        pyplot.plot(stock)
        pyplot.plot(elastic_output)
        pyplot.ylabel("Stock Price")
        pyplot.show()
        #print(stock.shape)

        #print(accuracy_score(stock["Close"], elastic_output["value"]))


stockTest = Predictor("BTC")
stockTest.makePrediction()



print("Yay the code didn't die somewhere!")



