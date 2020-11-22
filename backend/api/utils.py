import os
import tweepy


def get_api(request):
    # set up and return a twitter api object
    oauth = tweepy.OAuthHandler(os.environ.get("KKK"),
                                os.environ.get("MMM"))
    oauth.set_access_token(os.environ.get("PPP"),
                           os.environ.get("LLL"))
    api = tweepy.API(oauth)
    return api
