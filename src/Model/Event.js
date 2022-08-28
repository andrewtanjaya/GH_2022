export class Event {
  constructor(
    uid,
    type,
    title,
    description,
    longitude,
    latitude,
    accepted_uids,
  ) {
    this.title = title;
    this.uid = uid;
    this.type = type;
    this.description = description;
    this.longitude = longitude;
    this.latitude = latitude;
    this.accepted_uids = accepted_uids;
  }
}
