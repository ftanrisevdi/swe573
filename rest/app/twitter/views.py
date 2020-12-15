
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from decouple import config
import tweepy

auth = tweepy.OAuthHandler(config('ConsumerKey'), config('ConsumerSecret'))
auth.set_access_token(config('Key'), config('Secret'))
api = tweepy.API(auth)

class SearchResultView(RetrieveAPIView):
    # permission_classes = (IsAuthenticated,)
   # authentication_class = JSONWebTokenAuthentication
    def get(self,request ):
        key = request.query_params.get('key')
        tweets = tweepy.Cursor(api.search,
              q=key,
              lang="en").items(100)
        tweets_arr = []
        for tweet in tweets:
            tweets_arr.append(tweet.text)
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'data': tweets_arr
            }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)
