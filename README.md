<!-- markdownlint-disable MD009 MD032 -->

# GE-Crash

This project offers a visualization of the traffic accidents that happened since 2010 in Geneva, Switzerland, in a user selected time frame.

This work has been done as part of the HES-SO MSE Visualization Information course.

![Application preview](docs/pictures/app_general_view.png?raw=true "Application preview")

## Project documentation

- [**Project report**](docs/project_report.md) (in french)
- [**Slides of the presentation**](docs/GE-Crash_presentation.pdf) given on the 12th January 2018.
- [**Preview of the project**](https://cimami.github.io/ge-crash). Works best with **Google Chrome**.

## How to use it

### Installing and launching the app

- [Install NPM](https://www.npmjs.com/get-npm)
- Run the following commands :

```bash
    git clone https://github.com/cimami/ge-crash.git
    npm install -g gulp
    npm install
    gulp dev
```

### Updating the data

- Download the latest version of CSV data and replace the current file in `data/CSV_PTC_ACCIDENTS`
- Into `data` folder, run `python csvToJson.py`
- Run `gulp copy` and then `gulp dev`

## Data sources

### Traffic accidents 

Data are provided by the [SITG](http://ge.ch/sitg/) (territorial information system of Geneva).
Here's a complete description, including the list of features : ["Accidents de la circulation (depuis 2010)"](http://ge.ch/sitg/sitg_catalog/data_details/ea200bbb-ad3b-4bf2-977c-c8bc311eae61/xhtml_raw). 
The last updated data can be downloaded [here (CSV file)](http://ge.ch/sitg/sitg_catalog/data_downloads/ea200bbb-ad3b-4bf2-977c-c8bc311eae61/CSV_OTC_ACCIDENTS.zip).

### Map

The map comes from [OpenStreetMap](https://www.openstreetmap.org/).

## Technologies used

### Languages 

HTML5, CSS3, Javascript, Python.

### Librairies/Frameworks

[Bootstrap](https://getbootstrap.com/): open source toolkit for developing with HTML, CSS, and JS.\
[LeafletJS](http://leafletjs.com): open source JS library for mobile-friendly interactive maps.

## Authors

- Maxime Burri : maxime.burri@master.hes-so.ch
- Salvatore Cicciù : salvatore.cicciu@master.hes-so.ch
- Michaël Polla : michael@polla.net