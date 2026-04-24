import os
from flask import Flask
from app.routes import main

def create_app(config=None):
    # Get the absolute path to the directory containing __init__.py (which is 'app')
    app_dir = os.path.abspath(os.path.dirname(__file__))
    # Construct the absolute paths to the static and templates folders
    static_folder_path = os.path.join(app_dir, 'static')
    template_folder_path = os.path.join(app_dir, 'templates')

    app = Flask(__name__,
                static_folder=static_folder_path,
                static_url_path='/static',
                template_folder=template_folder_path)

    # Register blueprints
    app.register_blueprint(main)

    return app
