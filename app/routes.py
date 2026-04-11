from flask import Flask, render_template, Blueprint

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return render_template('home.html')

@main.route('/about')
def about():
    return render_template('about.html')

@main.route('/projects')
def projects():
    return render_template('projects.html')

@main.route('/contact')
def contact():
    return render_template('contact.html')

@main.route('/resume')
def resume():
    return render_template('resume.html')

