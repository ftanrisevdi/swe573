# Generated by Django 3.1.3 on 2021-01-12 00:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0009_twit_fatma'),
    ]

    operations = [
        migrations.RenameField(
            model_name='twit',
            old_name='fatma',
            new_name='user_id',
        ),
        migrations.RemoveField(
            model_name='twit',
            name='user',
        ),
    ]