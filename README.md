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
- Add animation when accident appears
- Add other informations (numbers of dead, injured, ...)
- Add stop/reset
- (Allow user can set slider position)