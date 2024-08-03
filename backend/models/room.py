from mongoengine import Document, ListField, StringField, ReferenceField, DateTimeField
from datetime import datetime

class Room(Document):
    users = ListField(ReferenceField('User'))
    start_date = DateTimeField(default=datetime.datetime.now)
    problem = ListField(ReferenceField('Problem'))

    def to_serializable_dict(self):
        entity_dict = self.to_mongo().to_dict()
        id = entity_dict.pop("_id", None)
        entity_dict["id"] = str(id)
        return entity_dict

    meta = {"collection": "rooms"}
