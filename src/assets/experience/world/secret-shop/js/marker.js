class Marker {

  constructor(poiData) {

    this.poiData = poiData;

    var markerLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);

    /*
        There are two major points that need to be considered while drawing multiple AR.Drawables at the same location. It has to be defined which one is before or behind another drawable (rendering order) and if they need a location offset. For both scenarios, ARchitect has some functionality to adjust the drawable behavior.

        To position the AR.Label in front of the background, the background drawable(AR.ImageDrawable) receives a zOrder of 0. Both labels have a zOrder of 1. This way it is guaranteed that the labels will be drawn in front of the background drawable.

        Assuming both labels will be drawn on the same geolocation connected with the same AR.GeoObject they will overlap. To adjust their position change the offsetX and offsetY property of an AR.Drawable object. The unit for offsets are SDUs. For more information about SDUs look up the code reference or the online documentation.

        In the following both AR.Labels are initialized and positioned. Note that they are added to the cam property of the AR.GeoObject the same way as an AR.ImageDrawable.
    */
    this.markerDrawableIdle = new AR.ImageDrawable(World.markerDrawableIdle, 2.5, {
        zOrder: 0,
        opacity: 1.0,
        scale: 3
    });

    this.titleLabel = new AR.Label(poiData.title, 1.5, {
        zOrder: 1,
        translate: {
            y: 0.55
        },
        style: {
            textColor: '#ff0000',
            fontStyle: AR.CONST.FONT_STYLE.BOLD
        }
    });

    this.descriptionLabel = new AR.Label(poiData.description, 1.1, {
        zOrder: 1,
        translate: {
            y: -0.55
        },
        style: {
            textColor: '#FFFFFF',
            fontStyle: AR.CONST.FONT_STYLE.BOLD
        }
    });

    /*
        Create an AR.ImageDrawable using the AR.ImageResource for the direction indicator which was created in the World. Set options regarding the offset and anchor of the image so that it will be displayed correctly on the edge of the screen.
    */
    this.directionIndicatorDrawable = new AR.ImageDrawable(World.markerDrawableDirectionIndicator, 0.1, {
        verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
    });

    this.markerObject = new AR.GeoObject(markerLocation, {
        drawables: {
           cam: [this.markerDrawableIdle, this.titleLabel, this.descriptionLabel],
           indicator: this.directionIndicatorDrawable
        }
    });
  }
}
