from sqlalchemy import func
from flask_pymongo import PyMongo
from forms import SearchForm
import pymongo

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy

import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func

engine = create_engine("sqlite:///new_flights.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Flights = Base.classes.flights

# Create an instance of Flask
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///new_flights.sqlite"
db = SQLAlchemy(app)
class Flights(db.Model):
    __tablename__ = 'flights'

    id = db.Column(db.Integer, primary_key=True)
    ticket_price = db.Column(db.Float)
    airline = db.Column(db.String)
    arrival = db.Column(db.String)
    date = db.Column(db.String)
    departure = db.Column(db.String)
    flight_duration = db.Column(db.String)
    plane = db.Column(db.String)
    plane_code = db.Column(db.String)
    stops = db.Column(db.String)
    IATA = db.Column(db.String)

    def __repr__(self):
        return '<flights %r>' % (self.airline)

@app.before_first_request
def setup():
    # Recreate database each time for demo
    # db.drop_all()
    db.create_all()

@app.route("/")
def home():
    # Return template and data
    return render_template("indexwithmap.html")

# Route that will trigger the scrape function

@app.route("/flights", methods=["GET", "POST"])
def flight():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    destino = " Paris"
    fecha = "10/10/2019"
    results = session.query(Flights.airline, Flights.arrival, Flights.date, Flights.departure, Flights.flight_duration, Flights.plane, Flights.stops, Flights.ticket_price, Flights.IATA).filter(
        Flights.arrival.like(destino),
        Flights.date.like(fecha)
        )

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_flights = []
    for airline, arrival, date, departure, flight_duration, plane, stops, ticket_price, IATA in results:
        flight_dict = {}
        flight_dict["airline"] = airline
        flight_dict["arrival"] = arrival
        flight_dict["date"] = date
        flight_dict["departure"] = departure
        flight_dict["flight_duration"] = flight_duration
        flight_dict["plane"] = plane
        flight_dict["stops"] = stops
        flight_dict["ticket_price"] = ticket_price
        flight_dict["IATA"] = IATA
        all_flights.append(flight_dict)

    return jsonify(all_flights)

@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        p_from = request.form["desde"]
        p_to = request.form["hasta"]
        p_date = request.form["fecha"]

    return render_template("results.html", p_from=p_from, p_to=p_to, p_date=p_date)

@app.route("/line")
def test():

    destino = " Paris"
    fecha = "10/10/2019"
    results = db.session.query(Flights.airline, func.count(Flights.airline)).group_by(Flights.airline).filter(
        Flights.arrival.like(destino),
        Flights.date.like(fecha)
    )

    airline = [result[0] for result in results]
    ticket_price = [result[1] for result in results]

    data = [{
        "x": airline,
        "y": ticket_price}]

    return jsonify(data)

@app.route("/api/pals")
def pals():
    results = db.session.query(Flights.airline, func.count(Flights.airline)).group_by(Flights.airline).all()

    airline = [result[0] for result in results]
    ticket_price = [result[1] for result in results]

    trace = {
        "x": airline,
        "y": ticket_price,
        "type": "bar"
    }

    return jsonify(trace)

if __name__ == "__main__":
    app.run(debug=True)
