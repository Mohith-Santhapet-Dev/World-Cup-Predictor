# World Cup 2026 Predictor

A full stack machine learning web app that predicts 2026 FIFA World Cup match outcomes using historical match data, FIFA rankings, and squad scores.

## Live Demo
https://world-cup-predictor-jbdtp40f6-mohith-santhapet-s-projects.vercel.app

## How It Works
Select a home team and away team from the 2026 World Cup squads and the model predicts the probability of each team winning based on historical data.

## Model
- Algorithm: Logistic Regression trained on 49,000+ international matches
- Features: FIFA world rankings, FIFA points, squad scores (goalkeeper, defence, midfield, offence), recent win rate, average goals scored and conceded, home advantage
- Accuracy: 75% on held out test data
- Validated against live 2026 World Cup matches

## Prediction Log
| Date | Match | Prediction | Actual Result |

| June 12 | South Korea vs Czechia | France 93% | TBD |
| June 12 | Mexico vs South Africa | Mexico 94% | TBD |

## Tech Stack
- ML: Python, scikit-learn, pandas, numpy
- Backend: Flask REST API deployed on Render
- Frontend: React, Vite deployed on Vercel
- Cloud: AWS EC2 (initial deployment)
- Version Control: Git, GitHub

## Project Structure