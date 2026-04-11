from flask import Flask
from app.routes import main

def create_app(config=None):
    app = Flask(__name__, static_folder="static", template_folder="templates")

    # Register blueprints
    app.register_blueprint(main)

    return app
