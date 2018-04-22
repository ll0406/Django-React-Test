from django.urls import include, path
from . import views
urlpatterns = [
    path('pairs', views.PairsList.as_view()),
]