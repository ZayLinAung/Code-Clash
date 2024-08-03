from mongoengine import Document, ListField, StringField, ReferenceField

class Problem(Document):
    title = StringField(required=True)
    description = StringField(required=True)
    difficulty = StringField(choices=['Easy', 'Medium', 'Hard'], required=True)
    sample_cases = ListField(ReferenceField('TestCase'))
    hidden_cases = ListField(ReferenceField('TestCase'))

    def to_serializable_dict(self):
        entity_dict = self.to_mongo().to_dict()
        id = entity_dict.pop("_id", None)
        entity_dict["id"] = str(id)
        return entity_dict

    meta = {"collection": "problems"}