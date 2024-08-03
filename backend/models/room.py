from mongoengine import Document, ListField, BooleanField, ReferenceField, DateTimeField, StringField


class Room(Document):
    owner = StringField()
    opponent = StringField()
    start_date = DateTimeField()
    problem = ReferenceField('Problem')
    started = BooleanField(default=False)

    def to_serializable_dict(self):
        entity_dict = self.to_mongo().to_dict()
        id = entity_dict.pop("_id", None)
        entity_dict["id"] = str(id)
        return entity_dict

    meta = {"collection": "rooms"}
