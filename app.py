from random import randint
from flask import Flask, request, redirect
from flask import render_template
import random
#from database import *
import requests
import time

app = Flask(__name__)

source = ''
index = 0
	
@app.route('/')
def home():

	with open("./templates/source.txt") as file:
		source = file.read()
		source = source.split('\n')
	print(source)
	random.shuffle(source)
	marker = 0
	score = 0
	
	return render_template("home.html", words = source, marker = marker, score = score)
	
@app.route('/results', methods = ['GET', 'POST'])
def results():

	if request.method == 'POST':
		return render_template('results.html', rightWords = request.form['right'], wrongWords = request.form['wrong'])
	return "oh no"
	
if __name__ == '__main__':
    app.run(debug=True)