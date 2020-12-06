import uuid
from django.db import models
from ..user.models import User


class UserProfile(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
  

    class Meta:
        db_table = "profile"