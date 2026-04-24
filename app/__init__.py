import os
from flask import Flask
from app.routes import main

def create_app(config=None):
    # Use absolute paths to ensure the Vercel serverless function locates folders correctly
    app_root = os.path.dirname(os.path.abspath(__file__))
    app = Flask(__name__,
                static_folder=os.path.join(app_root, 'static'),
                static_url_path='/static',
                template_folder=os.path.join(app_root, 'templates'))

    # Register blueprints
    app.register_blueprint(main)

    return app
