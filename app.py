from random import randint
from flask import Flask, request, redirect
from flask import render_template
import random
from database import *
import requests
import time

app = Flask(__name__)
connected_user = ''
source = ''

@app.route('/')
def home():
	
	#return render_template('index.html')
	return redirect('/signup')	
		
@app.route('/signup', methods = ['GET', 'POST'])
def signup():
	
	if request.method == 'GET':
		return render_template('sign_up.html')
	
	if get_user(request.form['username']) == None:
		add_user(username = request.form['username'], password = request.form['password'])
		connected_user = request.form['username']
		return redirect('/race/'+request.form['username'])
	
	return redirect('login')

@app.route('/login', methods = ['GET', 'POST'])
def login():
	
	if request.method == 'GET':
		return render_template('login.html')
	
	print(type(get_user(request.form['username'])))
	if get_user(request.form['username']) != None and is_the_user(request.form['username'], password = request.form['password']):

		return redirect('/race/'+request.form['username'])
	
	return redirect('/signup')
	
	
@app.route('/race/<string:username>', methods = ['GET', 'POST'])
def race(username):

	with open("./templates/source.txt") as file:
		source = file.read()
		source = source.split('\n')
			
	random.shuffle(source)
	return render_template("race.html", words = source, username = username)

@app.route('/results/<string:username>', methods = ['GET', 'POST'])
def results(username):

	if request.method == 'POST':
		set_new_record(username, new_record = int(request.form['right']))
		return render_template('results.html', rightWords = request.form['right'], wrongWords = request.form['wrong'], record = get_user(username).get_record(), username = username)
	
	return "What are you trying yo do?"
	
if __name__ == '__main__':
    app.run(debug=True)