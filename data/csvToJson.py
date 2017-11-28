# -*- coding: utf8-*-
import csv
import json
from GPSConverter import GPSConverter
import datetime

# The OTC_ACCIDENTS.csv is encoding with Windows-1250
# If we decode and re encode utf8 some caractère like à are ŕ
# !!! So : re-encode the file to utf8,
# but in future, find a solution with this comment code to make 
# conversion automatically
def reencode(file):
    for line in file:
    #   yield line.decode('windows-1250').encode('utf8')
        yield line

# Convcerts some attributes and remove others..
KEYS_STRING = [
    "CONDITIONS_LUMINEUSES",
    "COMMUNE",
    "JOUR",
    "CAUSE",
    "LOCALITE",
    "ETAT_ROUTE",
    "GROUPE_ACCIDENT",
    "GENRE_ROUTE",
    "CONSEQUENCES",
    "CONDITIONS_METEO",
    "DATE_",
    "HEURE"
]
KEYS_INTEGER = [
    "NB_BUS",
    "NB_CYCLOMOTEURS",
    "NB_MOTOS_50",
    "NB_VOITURES_TOURISME",
    "NB_BICYCLETTES",
    "ID_ACCIDENT",
    "NB_PIETONS",
    "NB_BLESSES_GRAVES",
    "NB_TUES",
    "NB_VAE_25",
    "NB_ENFANTS_ECOLE",
    "NB_CAMIONS",
    "NB_MOTOS_11KW",
    "NB_VAE_45",
    "NB_ENFANTS_IMPLIQUES",
    "NB_TRAM",
    "NB_VOITURES_LIVRAISON",
    "NB_MOTOS_125",
    "NB_BLESSES_LEGERS",
    "COOR_X",
    "COOR_Y",
    "E",
    "N"
]

converter = GPSConverter()




def arrange(rows):
    for accident in rows:
        # Convert attribute to integer or string or delete
        for attr in list(accident):
            if attr in KEYS_INTEGER:
                accident[attr] = int(float(accident[attr]))
            elif attr not in KEYS_STRING:
                del accident[attr]

        # Convert coordinate CH1903+ to long lat
        # CH1903+ is used (LV03) but it's CH1995 -> so -2000000.00 to EAST and -1000000 to NORTH
        # https://www.swisstopo.admin.ch/fr/cartes-donnees-en-ligne/calculation-services/navref.html
        accident["LAT"] = converter.CHtoWGSlat(accident["E"]-2000000.00 , accident["N"]-1000000.00 )
        accident["LNG"] = converter.CHtoWGSlng(accident["E"]-2000000.00 , accident["N"]-1000000.00 )

        # Concat date and hour
        datetimeAccident = accident["DATE_"][:10]
        time = accident["HEURE"][10:]
        if(time):
            datetimeAccident = datetimeAccident + time
        else:
            datetimeAccident = datetimeAccident + " 00:00:00"
        accident["DATE_"] = datetimeAccident

reader = csv.DictReader(reencode(open('./CSV_OTC_ACCIDENTS/OTC_ACCIDENTS.csv', 'rb')), delimiter=";")
rows = list(reader)
arrange(rows)
rows.sort(key=lambda x: datetime.datetime.strptime(x['DATE_'], '%Y-%m-%d %H:%M:%S'))

#print rows

with open('./accidents.json', 'w') as f:
    json.dump(rows, f)
