

export class WebSocketLocation {
  constructor() {
    this.device = navigator.userAgent || 'unknown';
    console.log(`WebSocketLocation initialized for device: ${this.device}`);
    this.isMobile = false;
    this.lattatude = null;
    this.longitude = null;
    this.getIsMobile();
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
    return [this.lattatude, this.longitude];
  }

  getDevice() {
      return this.device;
  }

  getLocationData() {
      return {
          isMobile: this.isMobile,
          latitude: this.lattatude,
          longitude: this.longitude
      };
  }
}