
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
import tweepy
auth = tweepy.OAuthHandler('xxx', 'xxx')
auth.set_access_token('xxx', 'xxx')
api = tweepy.API(auth)

class SearchResultView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication
    def get(self,request):
        tweets = tweepy.Cursor(api.search,
              q="covid",
              lang="en").items(100)
        tweetsArr = []
        for tweet in tweets:
            tweetsArr.append(tweet.text)
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'data': tweetsArr
            }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)
