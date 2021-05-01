import time
from finance import Predictor


#run this to start the AI

def runPredictions():
    print("updating predictions")
    costco = Predictor("COST")
    sherwin = Predictor("SHW")
    citrix = Predictor("CTXS")
    hershey = Predictor("HSY")

    sherwin.makePrediction()
    hershey.makePrediction()
    costco.makePrediction()
    citrix.makePrediction()

    print("Done!")



def main():
    print("Successfully ran with no errors")
    while True:
        runPredictions()
        time.sleep(30)



if __name__ == "__main__":
    main()