

export class WebSocketLocation {
  constructor() {
    this.device = navigator.userAgent || 'unknown';
    this.isMobile = false;
    this.lattatude = null;
    this.longitude = null;
    this.speed = null;
    this.heading = null;
    this.altitude = null;
    this.getIsMobile();
    this.cable = null;
    this.getLocationData();
  }

  getIsMobile() {
    const mobileRegex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    // Test with a user agent string
    this.isMobile = mobileRegex.test(navigator.userAgent);
  }

  updateLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lattatude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.speed = position.coords.speed;
          this.heading = position.coords.heading;
          this.altitude = position.coords.altitude;
          console.log(position)
          console.log(`Location retrieved: Latitude ${this.lattatude}, Longitude ${this.longitude}`);
        }, (error) => {
          console.error(`Error retrieving location: ${error.message}`);
          return false;
        }, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
    }
    if (window.AndroidNative && typeof window.AndroidNative.getLocation === 'function') {
      // Try to get location from native Android interface
      window.AndroidNative.getLocation((location) => {
        if (location) {
          this.lattatude = location.latitude;
          this.longitude = location.longitude;
          this.speed = location.speed;
          this.heading = location.heading;
          this.altitude = location.altitude;
          console.log('Android native location:', location);
        }
      });
    }
    return [this.lattatude, this.longitude];
  }

  getDevice() {
      return this.device;
  }

  getLocationData() {
      return {
          isMobile: this.isMobile,
          latitude: this.lattatude,
          longitude: this.longitude,
          speed: this.speed,
          heading: this.heading,
          altitude: this.altitude
      };
  }

  setCable(cable) {
    this.cable = cable;
    this.cable && this.cable.subscribeToChannel('LocationChannel', [],{
      connected: () => {
        console.log('WebSocketLocation connected to Location channel');
        this.cable.sendToChannel('LocationChannel', 'location_update', this.getLocationData());
      },
      received: (data) => {
        data.update && this.updateLocation() && this.cable.sendToChannel('LocationChannel', 'location_update', this.getLocationData());
        console.log('WebSocketLocation received data:', data);
      }
    })
  }


}