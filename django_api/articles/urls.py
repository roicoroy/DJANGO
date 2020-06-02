from django.conf.urls import url
from django.urls import path, include  # add this
from rest_framework.routers import DefaultRouter  # add this
from .api import ArticleViewSet  # add this

from . import views

app_name = 'articles'
router = DefaultRouter()  # add this
router.register('article_list', ArticleViewSet, basename='article_list')  # add this

urlpatterns = [
    path("api/", include(router.urls)),
    # url(r'^$', views.article_list, name="article_list"),
    # url(r'^create/$', views.article_create, name="create"),
    # url(r'^(?P<slug>[\w-]+)/$', views.article_detail, name="detail"),
]
