import tweepy
import os
from os.path import join, dirname
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

auth = tweepy.OAuthHandler(os.environ.get("KKK"),
                           os.environ.get("MMM"))
auth.set_access_token(os.environ.get("PPP"),
                      os.environ.get("LLL"))

api = tweepy.API(auth)

public_tweets = api.home_timeline()
for tweet in public_tweets:
    print(tweet.text)
