// implementation of AR-Experience (aka "World")
var World = {
	// true once data was fetched
	initiallyLoadedData: false,

	// POI-Marker asset
	markerDrawableIdle: null,

  markerDrawableDirectionIndicator: null,

	// called to inject new POI data
	loadPois: function loadPoisFn(poiData) {

		/*
			The example Image Recognition already explained how images are loaded and displayed in the augmented reality view. This sample loads an AR.ImageResource when the World variable was defined. It will be reused for each marker that we will create afterwards.
		*/
		World.markerDrawableIdle = new AR.ImageResource("assets/ionic.png");
 		World.markerDrawableDirectionIndicator = new AR.ImageResource("assets/indicator.png");

		/*
			Since there are additional changes concerning the marker it makes sense to extract the code to a separate Marker class (see marker.js). Parts of the code are moved from loadPoisFromJsonData to the Marker-class: the creation of the AR.GeoLocation, the creation of the AR.ImageDrawable and the creation of the AR.GeoObject. Then instantiate the Marker in the function loadPoisFromJsonData:
		*/
		var marker = new Marker(poiData);
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt) {

		/*
			The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the function was already called. With the first call of World.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the World.loadPoisFromJsonData function.
		*/
		if (!World.initiallyLoadedData) {
			// creates a poi object with a random location near the user's location
			var poiData = {
				"id": 1,
				"longitude": (lon + (Math.random() / 5 - 0.1)),
				"latitude": (lat + (Math.random() / 5 - 0.1)),
				"altitude": alt,
				"description": "The secret Ionic shop is here",
				"title": "Ionic meeting"
			};

			World.loadPois(poiData);
			World.initiallyLoadedData = true;
		}
	},
};

/*
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received.
*/
AR.context.onLocationChanged = World.locationChanged;
