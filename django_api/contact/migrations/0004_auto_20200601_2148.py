# Generated by Django 3.0.6 on 2020-06-01 20:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0003_auto_20200601_2120'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='author',
        ),
        migrations.RemoveField(
            model_name='contact',
            name='thumb',
        ),
    ]