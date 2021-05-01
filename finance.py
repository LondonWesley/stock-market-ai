import yfinance as yf
import pandas
from sklearn.linear_model import ElasticNet
import matplotlib.pyplot as pyplot
from datetime import date
import os
import math



#reg = linear_model.LassoLars(alpha=.1)

#reg.fit([[0, 0], [1, 1]], [0, 1])
#
# def updateOnGitHub(owner, csvFile, dataframe):
#     cwd = os.getcwd()
#     key = open(cwd + "/gitKey/GIT_TOKEN.txt")
#     token = key.read()
#    # query_url = f"https://api.github.com/repos/{owner}/{repo}/Stocks/" + stockCode + ".csv"
#     github = Github(token)
#     print(github.get_user().name)
#     repo = github.get_user().get_repo("stock-market-ai")
#     contents = repo.get_contents("Stocks/" + csvFile + ".csv")
#     repo.update_file(contents.path, "stock info updated " + csvFile, dataframe.to_string(), contents.sha, branch="main")

def formatDataFrame(df):
    dividend = -1
    firstDividend = dividend;
    #dz = pandas.DataFrame()
    #first go through to fill in missing dividends
    for index, row in df.iterrows():
        if math.isnan(row[1]):
            if dividend > -1:
                row[1] = dividend;
        elif not (dividend == row[1]):
                if firstDividend == -1:
                   firstDividend = row[1]
                dividend = row[1]


    #second pass to fill in first if empty
    for index, row in df.iterrows():
        if math.isnan(row[1]):
            row[1] = firstDividend
        print(row[1])

class Predictor:
    def __init__(self, stockName):
        self.stockName = stockName



    def makePrediction(self):
        cwd = os.getcwd()

        currentDate = date.today()
        stock = yf.download(self.stockName, "2000-02-01", currentDate, auto_adjust=True)
        print(stock)
        stock = stock[["Close","Open"]]
        actualStock = stock
        stock = stock.dropna()
        print(stock)

        stock["opening"] = stock["Open"]
        stock["twentyAVG"] = stock["Close"].rolling(window=20).mean()
        stock["dividend"] = yf.Ticker(self.stockName).dividends
        stock["valueNextDay"] = stock["Close"].shift(-1)
        pandas.set_option('display.max_rows', None)

        #print(stock)
        stock = stock.dropna()
        X = stock[["opening","dividend"]]

        y = stock["valueNextDay"]
        stock = stock.dropna()

        split_index = 0.2

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

        #elastic_output = elasticModel.predict(x_test)
        stock = yf.download(self.stockName, "2019-01-01", currentDate, auto_adjust=True)
        stock["dividend"] = yf.Ticker(self.stockName).dividends
        stockOpening = stock[["Open","dividend"]]
        formatDataFrame(stockOpening)
        stockClosing = stock[["Close"]]
        stockClosing = stockClosing.dropna()
        stockOpening = stockOpening.dropna()
        stockOpen = stockOpening
        elastic_output = elasticModel.predict(stockOpening)
        elastic_output = pandas.DataFrame(elastic_output, index = stockOpening.index, columns=["value"])

        elastic_output.to_csv (cwd + '/Stocks/'+ self.stockName + 'predicted.csv', index = True, header=True)
        #displaying the stock information

        #stock["Close"].plot()



        #updateOnGitHub("LondonWesley", self.stockName, stock)
        stockClosing.to_csv(cwd + '/Stocks/' + self.stockName + '.csv', index=True, header=True)
        #pyplot.plot(stock)
        #pyplot.plot(elastic_output)
        #pyplot.ylabel("Stock Price")
        #pyplot.show()
        #print(stock.shape)

        stock = yf.download(self.stockName, period="1d", auto_adjust=True)


