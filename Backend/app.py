from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from features import get_features
import pandas as pd


app = Flask(__name__)
CORS(app)
model = pickle.load(open('predict_model2.pkl', 'rb'))
df = pd.read_csv('../data/preprocessed_international_matches.csv')

@app.route('/teams', methods=['GET'])
def get_teams():
    teams = sorted(df['home_team'].unique().tolist())
    return jsonify({'teams': teams})

@app.route("/predict", methods = ['POST'])
def predict():
    data = request.get_json()
    home_team = data['home_team']
    away_team = data['away_team']
    features = get_features(home_team, away_team)

    probabilities = model.predict_proba([features])[0]
    return jsonify({
        'home_win': round(float(probabilities[1]), 2),
        'away_win': round(float(probabilities[0]), 2)
    })

if __name__ == "__main__":
    app.run(host = '0.0.0.0', port = 5555, debug = True)