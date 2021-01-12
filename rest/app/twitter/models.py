from ..user.models import User
from django.db import models


class Twit(models.Model):
    
    search_key_word = models.CharField(max_length=100) 
    created = models.DateTimeField()
    clean_twits = models.CharField(max_length=1000000)
    twits = models.CharField(max_length=1000000)
    user_id = models.CharField(max_length=255)

    def __str__(self):
        return self.id

    class Meta:
        '''
        to set table name in database
        '''
        db_table = "result"