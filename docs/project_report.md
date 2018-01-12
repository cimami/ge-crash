<!-- markdownlint-disable MD032 MD033 MD036 -->

# GE-Crash

## Groupe

- Maxime Burri : maxime.burri@master.hes-so.ch
- Salvatore Cicciù : salvatore.cicciu@master.hes-so.ch
- Michaël Polla : michael@polla.net

## Résumé du projet

### Public cible

Toute personne intéressée à étudier les accidents survenus à Genève sur une certaine période.

### Intention/Objectif

Nos buts premiers étaient :

- "Impressionner" l'utilisateur, par le biais d'une l'animation, afin de mettre en évidence la quantité d'accidents qui se produisent dans le canton, et leurs conséquences (nombre de blessés et morts).
- Offrir un outil permettant d'identifier les périodes et lieux les plus propices aux accidents, ainsi que leurs causes.

Une explication plus détaillée sera donnée dans la section Introduction du rapport.

### Sources de données

#### Accidents routiers

Les données proviennent du [SITG](http://ge.ch/sitg/) (Système d'information du territoire de Genève).\
Une decription est disponible ici : ["Accidents de la circulation (depuis 2010)"](http://ge.ch/sitg/sitg_catalog/data_details/ea200bbb-ad3b-4bf2-977c-c8bc311eae61/xhtml_raw).

#### Carte

La carte est fournie par [OpenStreetMap](https://www.openstreetmap.org/).

### Technologies utilisées

Langages : HTML5, CSS3, Javascript et Python.\
Librairies/Frameworks : [Bootstrap](https://getbootstrap.com/), 
[LeafletJS](http://leafletjs.com).

---

## Introduction

Parmi les exemples présentés durant le cours de Visualisation de l'Information, l'un d'eux a particulièrement retenu notre attention : [U.S. Gun Killings](https://guns.periscopic.com/?year=2010).\
Nous avons trouvé que l'animation avait un réel impact, un effet "choc" quand à la quantité de personne tuées en une seule année aux États-Unis. De même que le nombre d'années "volées", qui impressionne.

En cherchant des données à exploiter, nous sommes tombé sur les "accidents survenus à Genève à partir de 2010", parmi toutes les Open Data qu'offre le service d'information du territoire de Genève (SITG).\
Étant tous trois de Genève, et connaissant de fait bien le canton et ses problèmes de transport, nous avons été tout de suite intéressés par ces données.

Même si nous ne savions pas encore comment nous y prendre, nous souhaitions que notre projet prenne son inspiration dans la visualisation "U.S. Gun Killings" et son effet "choc".

De plus, nous souhaitions répondre à nos propres questions telles que "où y-a-t-il le plus d'accidents à Genève ?" ou plus généralement "combien d'accidents se produisent en une année ?"

Notre projet devait idéalement atteindre les objectifs suivants :

- "Impressionner" l'utilisateur, par le biais de l'animation, afin de mettre en évidence la quantité d'accidents qui se produisent dans le canton, et leurs conséquences (nombre de blessés et morts).
- Permettre d'identifier les périodes et lieux les plus propices aux accidents, ainsi que leurs causes.
- Servir d'outil pour identifier quels axes routiers pourraient être améliorés afin de prévenir certains types d'accidents.

- Répondre à certaines questions ou préjugés que l'on peut avoir, tels que :
  - Y-a-t-il plus d'accidents durant les fêtes (Nouvel an par exemple) ?
  - De même, y a-t-il certaines périodes (semaine/week-end, matinée/soirée) où l'on constate une plus grande fréquence d'accidents ? Et si oui, à cause de quoi ? (alcool ou fatigue la soirée, par exemple ?)
  - Est-ce que les accidents causés par l'alcool ont plus de conséquences (blessés graves ou morts) que ceux causés par un autre motif ?
  - Certains axes routiers sont-ils plus "dangereux" que d'autres ?

<!-- TODO: Add preview of app -->

## État de l'art

Nous avons cherché à savoir s'il existait déjà de telles visualisations. Pour Genève du moins, cela ne paraît pas être le cas. Le SITG offre la possibilité de créer des cartes personnalisées, auxquelles on ajoute les données souhaitées. Mais dans le cas des données qui nous intéressent, seul l'affichage de l'ensemble des points est réalisable :

![SITG map with traffic accidents data](pictures/sitg_map.png?raw=true  "SITG map with traffic accidents data" )

La carte n'offre aucune fonction de filtre, ni même l'affichage détaillé des données d'un point.

Les autres outils cartographiques suisses que nous avons pu trouver ne permettaient pas l'ajout de la couche de données qui nous intéresse.

Cela nous a conforté dans l'idée que notre projet était original et intéressant à réaliser.

## Conception

Cette section décrit les technologies utilisées et les sources de données ainsi que les manipulations ayant dû être effectuées sur celles-ci.

### Technologies

#### HTML5, CSS3, Javascript

S'agissant d'un projet web, il va de soit que nous allions devoir en bonne partie utiliser ces langages.

![HTML-CSS-JS logos](pictures/html_css_js_logos.png?raw=true "HTML-CSS-JS logos")

#### Python

Nous utilisons le langage Python pour notre script de conversion des données SITG.

![Python logo](pictures/python_logo.png?raw=true "Python logo")

#### Bootstrap

Nous avons employé le *framework* [Bootstrap](https://getbootstrap.com/) afin d'accélérer notre développement. Il s'agit d'un ensemble d'outils, open source, permettant de développer de manière rapide et efficace en HTML, CSS, et Javascript des sites *responsive* et donc adaptés aux différents types de support (ordinateur, téléphone mobile, tablette...).

![Bootstrap logo](pictures/bootstrap_logo.png?raw=true "Bootstrap logo")

#### LeafletJS

[LeafletJS](http://leafletjs.com) est une bibliothèque Javascript permettant de réaliser des cartes interactives, adaptées également aux supports mobiles.

Grâce à cet outil, il est plus facile de mettre en place une carte sur laquelle on peut naviguer, zoomer, et ajouter différentes couches et éléments (marqueurs, groupes de points, délimitations de zones...).

LeafletJS utilise [OpenStreetMap](https://www.openstreetmap.org/) pour les données cartographiques.

![LeafletJS logo](pictures/leafletjs_logo.png?raw=true "LeafletJS logo")

#### ChartJS

Comme son nom laisse supposer, il s'agit d'une bibliothèque Javascript permettant de réaliser des graphiques de toutes sortes. Nous l'utilisons notamment pour l'histogramme ainsi que le *pie chart* des causes d'accidents.

![ChartJS logo](pictures/chartjs_logo.png?raw=true "ChartJS logo")

#### Node.js

Node.js est un outil populaire permettant d'exécuter du Javascript non plus côté client (navigateur web), mais côté serveur.

![Node.js logo](pictures/nodejs_logo.png?raw=true "Node.js logo")

### Données utilisées

#### Accidents de la circulation à Genève

Nos données principales. Celles-ci proviennent du [SITG](http://ge.ch/sitg/) (Système d'information du territoire de Genève).\
Une description complète du jeu de données utilisé, incluant la liste des informations disponibles, est disponible ici : ["Accidents de la circulation (depuis 2010)"](http://ge.ch/sitg/sitg_catalog/data_details/ea200bbb-ad3b-4bf2-977c-c8bc311eae61/xhtml_raw).

Ce jeu de données est très détaillé. Pour chaque accident, de nombreux paramètres sont accessibles, tels que :
- Date, heure, jour de la semaine,
- Coordonnées exactes,
- Conditions météo (beau, couvert, chute de neige...) et période de la journée (aurore, jour, nuit...)
- Type de route,
- Nombre de blessés légers, blessés graves, morts
- Nombre d'enfants parmis les victimes
- Type et nombre de véhicules impliqués
- Causes de l'accident (alcool, inattention, vitesse, non-respect des règles de circulation...)
- Conséquences (avec blessés ou non)

Les données étant au format CSV, il nous a fallu réaliser un script qui extrait celles-ci et les transforme afin d'être utilisables dans notre application. Cela consiste principalement à récupérer toutes les données de chaque accident (véhicules impliqués, nombre de blessés, cause, etc.) et à les structurer de manière à pouvoir les afficher sur la carte par la suite.

#### Données cartographiques

Cette seconde source de données provient d'[OpenStreetMap](https://www.openstreetmap.org/). Elle est récupérée et prétraitée par LeafletJS. De notre côté, nous avons eu à définir le bon endroit de carte à afficher et délimiter les frontières afin de ne conserver que Genève.

Voici un extrait des données brutes, ouvertes dans Excel :

![Traffic accidents CSV abstract](pictures/traffic_accidents_csv_abstract.png?raw=true "Traffic accidents CSV abstract")

## Réalisation

Cette section présente le travail réalisé ainsi que les choix effectués.

### Présentation de "GE-Crash"

Notre visualisation est présentée sur une unique page web.

Lorsque l'on arrive dessus, une animation est automatiquement démarrée. Celle-ci représente les accidents ayant eu lieu à Genève durant toute l'année 2016. L'utilisateur voit au fil des secondes les incidents s'ajouter sur la carte.

Voici une vue générale de l'application, en cours d'animation :

![GE-Crash animation running](pictures/app_animation_running.png?raw=true "GE-Crash animation running")

Lorsqu'un accident a lieu :

- Un effet "explosif" se produit à son emplacement sur la carte. Cela consiste en un cercle rouge, légèrement transparent afin de ne pas trop être aggressif pour l'oeil, qui apparaît brièvement.
- Le cercle laisse ensuite place à une icône d'accident :\
![accident icon](pictures/accident_icon.png?raw=true "accident icon")\
Comme il se produit énormément d'accidents, parfois aux mêmes endroits,  ceux-ci sont alors regroupés en *clusters* :\
 ![Cluster](pictures/cluster.png?raw=true "Cluster")
- les données de l'accident viennent s'ajouter à celles du volet droit. Par défaut, celui-ci affiche l'onglet "Blessés légers/graves/morts", ces derniers étant représentés par une icône de personne.

Le but de cette animation, d'une durée de quelques secondes, est de faire prendre réellement conscience du nombre d'accidents qui se produisent, et des conséquences que cela implique. La vitesse à laquelle les points apparaissent sur la carte ainsi que les personnages représentant les victimes, montre l'ampleur des dégâts.
Nous avons privilégié la mise en évidence des données blessés/morts par rapport aux deux autres catégories car ce sont celles qui sont les plus marquantes.

### Contrôles

Nous décrivons ici les différentes manipulations que l'utilisateur peut effectuer au sein de la visualisation.

#### Timeline

Grâce aux contrôles situés en bas de page, l'utilisateur peut :

- Voir la progression temporelle et la date/heure des données courantes,
- Mettre sur pause/reprendre/arrêter l'animation,
- Sélectionner une autre plage de dates.

 ![Timeline control](pictures/timeline_control.png?raw=true "Timeline control")

#### Modification de l'affichage sur carte

Selon son envie, l'utilisateur peut activer ou désactiver :

- l'affichage des cercles d'animation des accidents,
- la *heatmap*, ou "zone de chaleur".

![Map filters](pictures/map_filters.png?raw=true "Map filters")

#### Navigation sur la carte

Comme cela est de coutume avec les cartes interactives, il est possible de :

- se déplacer - par cliquer-glisser ou en glissant les doigts si écran tactile,
- zoomer/dézommer - avec la molette de la souris ou les gestes correspondants (*pinch-in*, *pinch-out*).

Lorsque l'on zoome sur la carte, les *clusters* se réorganisent afin de répartir au mieux les accidents. Illustration :

![Zoom example](pictures/zoom_example.png?raw=true "Zoom example")

D'autres manipulations sont également disponibles :
- cliquer sur une zone - définie par un ensemble d'accidents - pour zoomer dessus,
- survoler l'une des icônes du volet droit pour centrer la carte sur l'emplacement de l'accident correspondant et afficher ses détails, comme illustré ci-dessous :

![Selected data](pictures/selected_data.png?raw=true "Selected data")

### Visualisation des données

Nous présentons ici les différentes informations que l'utilisateur peut obtenir à partir de cette visualisation.

#### Histogramme

![Histogram](pictures/histogram.png?raw=true "Histogram")

L'histogramme illustre la quantité d'accidents ayant eu lieu par plages de temps. Il est situé juste en-dessous de la barre temporelle, afin d'aider à se situer dans le temps - bien que l'échelle de l'abscisse le permette déjà.

Lorsque l'on survole l'une des barre, le nombre d'accidents est affiché.

#### Heatmap

Afin de mieux mettre en évidence l'occurence d'accidents dans les différentes régions du canton, une *heatmap* (désactivable) est superposée à la carte :

![Heatmap](pictures/heatmap.png?raw=true "Heatmap")

#### Détails d'un accident

Les données concernant un accident particulier peuvent être accédées en sélectionnant l'icône de celui-ci :

![Accident selected](pictures/accident_selected.png?raw=true "Accident selected")

Notons que s'il s'agit d'un *cluster*, donc de plusieurs accidents, le fait de cliquer dessus fera s'agrandir la carte sur la zone concernée et diviser le *cluster*. Il n'y a par conséquent pas la possibilité d'afficher les données d'un groupe d'accidents.

Comme indiqué dans la rubrique "Données utilisées", le SITG fournit une quantité impressionnante de paramètres. Pour la vue détaillée, nous avons donc procédé à une sélection des données nous paraissant les plus pertinentes et intéressantes. Les valeurs sont textuelles/numériques, et dans le cas des blessés et des transports, également représentées par une icône.

Enfin, il est aussi possible d'accéder aux données d'un accident en survolant un des personnage ou des véhicules (selon l'onglet dans lequel on se trouve) de l'onglet de droite, comme cela a été illustré un peu plus haut.

#### Volet d'information

Le volet situé à droite affiche différentes catégories d'information.

##### Blessés légers/graves/morts

C'est la catégorie par défaut. Comme évoqué précédemment, nous avons souhaité, en plus d'un affichage numérique, représenter chaque victime par une icône de personnage.\
L'affichage s'adapte au fur et à mesure de l'animation. Si un nombre trop important de victimes doit être représenté, la vue se rapetisse au fur et à mesure. Cela permet de toujours afficher l'ensemble des personnages, plutôt que de nécessiter une barre de défilement, qui nuirait à l'esthétique et à l'impression que nous souhaitons donner.

![Injured and dead view](pictures/injured_dead_count.png?raw=true "Injured and dead view")

Lorsque plusieurs personnages sont "collés" ensemble, c'est qu'il s'agit des victimes d'un même accident.

##### Véhicules

![Vehicles](pictures/vehicles3.png?raw=true "Vehicles")

Cet onglet fonctionne sur le même principe que le précédent. Là, ce sont les différents types de véhicules impliqués dans les accidents qui sont représentés, en trois catégories :

- 4 roues : inclut les véhicules légers tout comme les les poids lourds
- 2 roues : inclut les vélos, scooters, motos
- TPG : les véhicules des Transports Publics Genevois (bus, trams, trolleybus).

Le même principe de regroupement est appliqué. Si deux voitures sont accolées, c'est qu'elles sont impliquées dans un même accident.

##### Causes

![Causes](pictures/causes.png?raw=true "Causes")

Cette dernière catégorie affiche sous forme d'un *pie chart* les difféntes causes d'accident. Le SITG en répertorie plusieurs dizaines.

Nous souhaitions afficher moins de catégories et avions commencé par faire des regroupements, mais l'information était alors biaisée. Par exemple, l'alcool n'apparaissait qu'en 4ème position, parce qu'il était devancé par des causes qui individuellement n'étaient pas très significatives, mais représentaient un fort pourcentage une fois groupée.

Nous avons donc choisi de conserver l'ensemble des catégories, au risque que cela paraisse quelque peut surchargé. Ne conserver que les causes principales sans pour autant déformer les données aurait nécessité une approche différente sur les données fournies.

Néanmoins, pour faciliter la lecture, le survol d'un secteur affiche sa légende et son pourcentage :

![Causes hover](pictures/causes_hover.png?raw=true "Causes hover")

## Application des concepts vus en cours

Dans cette section, nous discutons de certains concepts qui nous ont été présentés au cours VI. Pour chacun, nous expliquons si nous pensons l'avoir respecté ou non, avec des idées pour y remédier le cas échéant.

### 7 mantras de Ben Shneiderman

- **Overview** : après relecture des explications données dans "*The Eyes Have It*", il semble que nous ne respections pas tout à fait ce point. En effet, seul l'ensemble des données *d'une période prédéfinie* est visible sur la carte lorsque l'animation se termine.\
Si nous avons bien compris ce point, il aurait fallu commencer par afficher la totalité des accidents (de 2010 à maintenant). Ce n'est qu'alors qu'une sélection d'une période donnée aurait dû être faite.

- **Zoom** : respecté. On peut zoomer sur des zones particulières, sur des accidents...

- **Filter** : ce point n'a pas pu être respecté par manque de temps, mais nous avions prévu dès le départ d'implémenter des fonctions de filtres, qui aurait été d'une grande utilité pour faire des analyses plus approfondies, par exemple :
  - N'afficher que les accidents ayant causés des décès,
  - Représenter les accidents causés par certains motifs particuliers uniquement,
  - Filtrer par heure de la journée, par exemple n'afficher que les accidents ayant eu lieu la nuit
  - Etc.

- **Details-on-demand** : respecté. La sélection d'un accident affiche les données détaillées de celui-ci.

- **Relate**: pas implémenté, mais faisait partie de notre idée d'origine. Nous souhaitions montrer les éventuelles relations qu'il pourrait y avoir par exemple entre les périodes de l'année et le nombre d'accidents, ou encore le nombre d'accidents dans certaines régions, par rapport à la dangerosité des axes/carrefours avoisinants.

- **History**:  pas implémenté, mais cela aurait sans doute été le cas avec les filtres (conserver un historique des opérations effectuées sur les données).

- **Extract**: pas implémenté.

### Lois de Gestalt

Nous avons utilisé le **principe de proximité** dans la représentation des victimes ainsi que des véhicules, afin de différencier les éléments concernés par un même accident des autres.\
Par exemple les deux vélos ci-dessous sont regroupés, car impliqué dans un même accident :

![Gestalt proximity](pictures/gestalt_proximity.png?raw=true "Gestalt proximity")

### Daltonisme

Le simulateur [Coblis](http://www.color-blindness.com/coblis-color-blindness-simulator/) (*Color Blindness Simulator*) permet de visualiser une image telle qu'elle serait vue par une personne souffrant d'anomalie de la vision affectant la perception des couleurs.

Nous avons tout d'abord analysé la carte. Celle-ci paraît rester bien lisible quel que soit le défaut visuel.\
L'exemple ci-dessous illustre à gauche la *Green-Weak/Deuteranomaly* et à droite la *Blue-Blind/Tritanopia* :

![Colorblind Example](pictures/colorblind_example.png?raw=true "Colorblind Example")

Malheureusement, nous ne pouvons pas en dire autant de notre *piechart* des causes. Les nombreuses catégories nécessitent autant de couleurs et, par conséquent, lorsque l'on souffre d'une affection de la vision, on a l'impression que plein de catégories sont représentées par des couleurs similaires.\
Exemple ci-dessous simulant la *Blue-Blind/Tritanopia* :

![Colorblind Piechart](pictures/blue_blind_piechart.png?raw=true "Colorblind Piechart")

## Améliorations

Nous n'avons pas réussi à réaliser tout ce que nous souhaitions pour ce projet. Voici donc une liste non exhaustive de fonctionnalités ou modifications que nous avions prévues :

**Fonctionnement général**

- Permettre de passer l'animation, par exemple en cliquant sur le bouton "Stop".
- Déploiement de l'application sur une plateforme comme [Heroku.com](https://www.heroku.com) afin que l'utilisateur n'ait pas à installer tout le projet lui-même avant de pouvoir commencer à l'utiliser.

**Contrôles**

- Permettre à l'utilisateur de repositionner manuellement le slider.
- Ajout d'un bouton "Dégrouper" les groupes dans l'affichage
- Ajout de boutons + et - pour le contrôle du zoom de la carte.
- Ajout d'un bouton permettant de restreindre les données à la zone actuelle
- Ajout de filtres

**Données**

- Accéder aux données via l'[API REST](http://ge.ch/sitg/services/services-carto/open-data) offerte par le système de cartographie avancée des SITG. Ainsi les données utilisées seraient toujours les dernières, sans nécessiter de mise à jour manuelle.
- Ajouter des articles de journaux en relation avec des accidents ayant eu lieu.

**Visualisation**

Dans la visualisation [U.S. Gun Killings](https://guns.periscopic.com/?year=2010), un élément marquant est le nombre d'années "volées". Nous aurions souhaité faire de même par rapport aux victimes décédées d'accidents de la route. Pour cela, on aurait pu imaginer utiliser des données démographiques afin de faire des estimations proches de la réalité.

## Conclusion

Ce projet nous a permis d'appliquer, ou du moins essayer autant que possible, les bonnes pratiques apprises durant les cours de Visualisation de l'Information.

Nous avons pu nous apercevoir que, même si certains critères paraissent évidents de prime abord, il n'est pas toujours simple de tous les respecter lors de la réalisation d'une telle visualisation.

Malgré un temps condisérable investi, nous regrettons n'avoir pas pu implémenter toutes les idées que nous avions.

Néanmoins, nous avons apprécié réaliser une visualisation sur la base d'une idée qui nous paraissait originale et qui nous concernait (habitant tous les trois Genève).
