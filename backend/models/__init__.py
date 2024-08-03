from mongoengine import connect


def init_app(app):
    from .problem import Problem
    from .test_case import TestCase

    app.app_context().push()
    DATABASE_URL = "mongodb://localhost:27017"
    connect(host=app.config["MONGODB_URL"])
