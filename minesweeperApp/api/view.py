from rest_framework import generics
from minesweeperApp.models import Usermap

class UsermapRuView(generics.RetrieveUpdateAPIView):
    pass
    lookup_field = 'pk'

    def get_queryset(self):
        return Usermap.objects.all()

    def get_object(self):
        pk = self.kwards.get("pk")
        return Usermap.objects.get(user_name=pk)
