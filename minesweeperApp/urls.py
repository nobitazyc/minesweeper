from django.urls import path
from django.conf.urls import url,include
from django.views.generic import TemplateView
from rest_framework import routers, serializers, viewsets
from . import views
from .views import indexView, usermapView, usermapRefreshView
from rest_framework.urlpatterns import format_suffix_patterns
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', indexView.as_view()),
    url(r'^usermap', usermapView.as_view()),
    url(r'^refresh',usermapRefreshView.as_view())
]
