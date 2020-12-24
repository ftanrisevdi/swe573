
from .services import get_stopwords, word_count
from .serializers import TwitSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from termcolor import colored, cprint
from decouple import config
import tweepy
import json 
import datetime
import string
import re



auth = tweepy.OAuthHandler(config('ConsumerKey'), config('ConsumerSecret'))
auth.set_access_token(config('Key'), config('Secret'))
api = tweepy.API(auth)

class SearchResultView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication
    serializer_class = TwitSerializer

    def get(self,request ):
        key = request.query_params.get('key')
        tweets = tweepy.Cursor(api.search,
              tweet_mode='extended',
              q=key,
              lang="en").items(100)
        tweets_arr = []
        clean_tweets = ''
        words = []
        stopwords = get_stopwords()
        json_str = '['
        table = str.maketrans(dict.fromkeys(string.punctuation))
        for tweet in tweets:            
            json_str = json_str + json.dumps(tweet._json) + ','
            tweets_arr.append(tweet.full_text)
            querywords = tweet.full_text.lower()
            querywords  = ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)","", querywords).split())
            querywords = querywords.translate(table)
            querywords = querywords.split()
            resultwords  = [ word for word in querywords if word.lower() not in stopwords]
            clean_tweets = clean_tweets + ' '.join(resultwords)
            words = word_count(clean_tweets)
        json_str = json_str + ']'
        result = {
            'search_key_word':key,
            'twits':json_str,
            'created':datetime.datetime.now(),
            'cleanTwits': clean_tweets,
        }
        serializer = self.serializer_class(data=result)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'data': {
                    'rawData':  json_str,
                    'twits': tweets_arr,
                    'cleanTwits': clean_tweets,
                    "wordCount": words
                } 
            }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)


