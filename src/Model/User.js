export class User {
  constructor(uid, email, name, photoUrl, longitude, latitude, token) {
    this.uid = uid;
    this.email = email;
    this.name = name;
    this.photoUrl = photoUrl;
    this.longitude = longitude;
    this.latitude = latitude;
    this.token = token;
  }
}
