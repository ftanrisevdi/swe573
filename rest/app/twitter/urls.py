from django.conf.urls import url
from .views import SearchResultView


urlpatterns = [
    url(r'^search', SearchResultView.as_view()),
    url(r'^log', SearchResultView.as_view()),
    ]