from mongoengine import connect


def init_app(app):
    from .problem import Problem
    from .test_case import TestCase

    app.app_context().push()
    connect(host=app.config["MONGODB_URL"])
