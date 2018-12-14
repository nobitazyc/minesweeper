from rest_framework import serializers
from minesweeperApp.models import Usermap
import ast


# Serializers define the API representation.
class UsermapSerializer(serializers.ModelSerializer):
    map = serializers.SerializerMethodField()

    class Meta:
        model = Usermap
        fields = ('__all__')

    def get_map(self,obj):
        map = ast.literal_eval(obj.map)
        for index1, row in enumerate(map):
            for index2,cell in enumerate(row):
                if cell[1] == 0:
                    cell[0] = 0
        return str(map)
