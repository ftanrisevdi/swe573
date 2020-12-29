
from .services import give_emoji_free_text, tagme, word_count, clean_text
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
from sklearn.model_selection import train_test_split

auth = tweepy.OAuthHandler(config('ConsumerKey'), config('ConsumerSecret'))
auth.set_access_token(config('Key'), config('Secret'))
api = tweepy.API(auth)

class SearchResultView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication
    serializer_class = TwitSerializer

    def get(self,request ):
        key = request.query_params.get('key')
        language = request.query_params.get('language')
        tweets = tweepy.Cursor(api.search,
              tweet_mode='extended',
              q=key,
              lang=language).items(1)
        tweets_arr = []
        clean_tweet = ''
        clean_tweets = []
        words = []
        json_str = '['
        full_text =''
        for tweet in tweets:            
            json_str = json_str + json.dumps(tweet._json) + ','
            full_text = tweet.full_text
            if hasattr(tweet, 'retweeted_status'):
                full_text = tweet.retweeted_status.full_text
            clean_tweet = give_emoji_free_text(full_text)
            clean_tweets.append(clean_text(clean_tweet))
            print(tagme({"lang":language, "text":full_text, "rho": 75}))            
            tweets_arr.append(full_text)
        words = word_count(clean_tweets)

        # train, test = train_test_split(clean_tweets,test_size = 0.1)
        # train_pos = train[ train['sentiment'] == 'Positive']
        # print(train_pos)
        # train_pos = train_pos['text']
        # print(train_pos)
        # train_neg = train[ train['sentiment'] == 'Negative']
        # train_neg = train_neg['text']
        # train_neu = train[ train['sentiment'] == 'Neutral']
        # train_neu = train_neu['text']



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


