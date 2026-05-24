import pandas as pd


country_hosts = ["Canada", "Mexico", "United States"]
df = pd.read_csv('../data/preprocessed_international_matches.csv')
def get_features(home_team, away_team):
    
    recent_home_team_df = df[df['home_team'] == home_team]
    recent_away_team_df = df[df['away_team'] == away_team]
    
    if home_team in country_hosts:
        neutral_location = 0
    else: neutral_location = 1

    home_team_fifa_rank = recent_home_team_df['home_team_fifa_rank'].iloc[-1]
    away_team_fifa_rank = recent_away_team_df['away_team_fifa_rank'].iloc[-1]
    home_team_total_fifa_points = recent_home_team_df['home_team_total_fifa_points'].iloc[-1]
    away_team_total_fifa_points = recent_away_team_df['away_team_total_fifa_points'].iloc[-1]
    home_team_goalkeeper_score = recent_home_team_df['home_team_goalkeeper_score'].iloc[-1]
    away_team_goalkeeper_score = recent_away_team_df['away_team_goalkeeper_score'].iloc[-1]
    home_team_mean_defense_score = recent_home_team_df['home_team_mean_defense_score'].iloc[-1]
    home_team_mean_offense_score = recent_home_team_df['home_team_mean_offense_score'].iloc[-1]
    home_team_mean_midfield_score = recent_home_team_df['home_team_mean_midfield_score'].iloc[-1]
    away_team_mean_defense_score = recent_away_team_df['away_team_mean_defense_score'].iloc[-1]
    away_team_mean_offense_score = recent_away_team_df['away_team_mean_offense_score'].iloc[-1]
    away_team_mean_midfield_score = recent_away_team_df['away_team_mean_midfield_score'].iloc[-1]
    recent_home_win_rate = recent_home_team_df['recent_home_win_rate'].iloc[-1]
    recent_away_win_rate = recent_away_team_df['recent_away_win_rate'].iloc[-1]
    return [home_team_fifa_rank, away_team_fifa_rank, home_team_total_fifa_points, away_team_total_fifa_points,
            neutral_location, home_team_goalkeeper_score,away_team_goalkeeper_score, home_team_mean_defense_score, home_team_mean_offense_score,
            home_team_mean_midfield_score, away_team_mean_defense_score, away_team_mean_offense_score, away_team_mean_midfield_score, recent_home_win_rate, recent_away_win_rate]




