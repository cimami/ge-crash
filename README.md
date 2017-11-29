<!-- markdownlint-disable MD009 -->

# ge-crash

HES-SO MSE Visualization Information course project

## Installation & execution

### Install gulp

```npm install -g gulp```  
```npm install```

### Run

```gulp dev```

## Update data

- Download in csv and replace ```data/CSV_PTC_ACCIDENTS```
- Check encoding of ```OTC_ACCIDENTS.csv``` in ```utf-8``` and not in ```Windows 1252``` (open with editor and save as..)
- In ```data``` folder run ```python csvToJson.py```
- Run ```gulp copy``` then ```gulp dev```


## To do

- ~~Take in account the time of accident (not only the date)~~
- ~~Add animation when accident appears~~
- Add other informations (numbers of dead, injured, ...)
- Add stop/reset
- (Allow user can set slider position)

## Data sources

Open-data from [SITG](http://ge.ch/sitg/) : ["Accidents de la circulation (depuis 2010)"](http://ge.ch/sitg/sitg_catalog/data_details/ea200bbb-ad3b-4bf2-977c-c8bc311eae61/xhtml_raw)

## Technologies used

[Bootstrap](https://getbootstrap.com/) : open source toolkit for developing with HTML, CSS, and JS
[LeafletJS](http://leafletjs.com): open source JS library for mobile-friendly interactive maps
