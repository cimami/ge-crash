//https://github.com/turban/Leaflet.Mask
$(document).ready(function () {
        
    // Extend Mask from polygon
    L.Mask = L.Polygon.extend({
        options: {
            stroke: true,
            color: '#f8f8f8',
            fillOpacity: 1.0,
            clickable: true,

            outerBounds: new L.LatLngBounds([-90, -360], [90, 360])
        },

        initialize: function (latLngs, options) {
            
            var outerBoundsLatLngs = [
                this.options.outerBounds.getSouthWest(),
                this.options.outerBounds.getNorthWest(),
                this.options.outerBounds.getNorthEast(),
                this.options.outerBounds.getSouthEast()
            ];
            L.Polygon.prototype.initialize.call(this, [outerBoundsLatLngs, latLngs], options);	
        },

    });

    // Add mast function
    L.mask = function (latLngs, options) {
        return new L.Mask(latLngs, options);
    };
});

// Transform GeoJSON coordinate to Leaflet LatLong array
function geoJsonCoordinateToLatLng(coordinates){
    var latLngs = [];
    for (i=0; i<coordinates.length; i++) {
        latLngs.push(new L.LatLng(coordinates[i][1], coordinates[i][0]));
    }
    return latLngs;
}