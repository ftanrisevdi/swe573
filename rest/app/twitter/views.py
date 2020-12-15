
from .serializers import TwitSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from decouple import config
import tweepy
import json 
import datetime


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
              q=key,
              lang="en").items(100)
        tweets_arr = []
        
        json_str = '['
        for tweet in tweets:
            json_str = json_str + json.dumps(tweet._json) + ','
            tweets_arr.append(tweet.text)
        json_str = json_str + ']'
        result = {
            'search_key_word':key,
            'twits':json_str,
            'created':datetime.datetime.now()
        }
        serializer = self.serializer_class(data=result)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'data': tweets_arr
            }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)


