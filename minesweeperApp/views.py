from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from minesweeperApp.models import Usermap
from .serializer import UsermapSerializer
from random import randint
import json
import ast

class indexView(TemplateView):
    template_name = 'react.html'

# Create your views here.
class usermapRefreshView(APIView):
    def randomMines(self,mineSize,rowLength,columnLength):
        mines = []
        x = 0
        while x < mineSize:
            exist = False
            row = randint(0,rowLength-1)
            column = randint(0,columnLength-1)
            for mine in mines:
                if mine[0]==row and mine[1]==column:
                    exist = True
                    x = x-1
            if not exist:
                mines.append([row,column])
            x = x+1
        return mines

    def randomMap(self,mineSize,rowLength,columnLength):
        mines = self.randomMines(mineSize,rowLength,columnLength)
        mineMap = []
        for i in range(0,rowLength):
            mineMap.append([])
            for j in range(0,columnLength):
                number = 0
                isMine = False
                for mine in mines:
                    if i==mine[0] and j==mine[1]:
                        isMine = True
                        mineMap[i].append([-1,0])
                    elif abs(i-mine[0]) <=1 and abs(j-mine[1])<=1:
                        number = number+1
                if not isMine:
                    mineMap[i].append([number,0])
        return mineMap

    def post(self,request):
        usermap = Usermap.objects.get(pk=1)
        usermap.map = str(self.randomMap(8,8,8))
        usermap.save()
        serializer = UsermapSerializer(usermap)
        return Response(serializer.data)

class usermapView(APIView):

    def __init__(self):
        self.originalClicked = True

    def clicked(self,row,column,map,originalClicked):
        mines = self.getMines(map)
        for mine in mines:
            if row == mine[0] and column == mine[1] and originalClicked:
                map[row][column][1] = 1
                return map
        if map[row][column][0] > 0:
            map[row][column][1] = 1
            return map
        else:
            map[row][column][1] = 1
            i = -1
            while i <= 1:
                if row+i >=0 and row+i <= 7:
                    j = -1
                    while j <= 1:
                        if column+j >=0 and column+j <= 7:
                            if (not (i == 0 and j == 0) and map[row+i][column+j][1] == 0 ):
                                map = self.clicked(row+i,column+j,map,False)
                        j = j+1
                i = i+1
        return map

    def getMines(self,map):
        mines = []
        for index1, row in enumerate(map):
            for index2,cell in enumerate(row):
                if cell[0] == -1:
                    mines.append([index1,index2])
        return mines

    def get(self,request):
        usermap = Usermap.objects.get(pk=1)
        serializer = UsermapSerializer(usermap)
        return Response(serializer.data)

    def post(self,request):
        usermap = Usermap.objects.get(pk=1)
        usermap.map = str(self.clicked(request.data["row"],request.data["column"],ast.literal_eval(usermap.map),True))
        usermap.save()
        serializer = UsermapSerializer(usermap)
        return Response(serializer.data)
