from mongoengine import Document, DictField

class TestCase(Document):
    input_data = DictField(required=True)  # Using DictField to store inputs as key-value pairs
    expected_output = DictField(required=True)  # Using DictField to store outputs as key-value pairs

    def to_serializable_dict(self):
        entity_dict = self.to_mongo().to_dict()
        id = entity_dict.pop("_id", None)
        entity_dict["id"] = str(id)
        return entity_dict

    meta = {"collection": "test_cases"}