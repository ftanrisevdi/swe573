import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS
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
user = api.get_user('twitter')
public_tweets = api.search('reis')
x = []
for tweet in public_tweets:
    x.append({'id':  tweet.id, 'createdAt': tweet.created_at,
              'text': tweet.text,
              'user': tweet.user,
              'entities': tweet.entities})
print('----------------')
print(x[0])
print('----------------')
