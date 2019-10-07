import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///new_flights.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Flights = Base.classes.flights

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
        f"/api/v1.0/passengers"
    )



@app.route("/flights")
def flight():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    destino = " Amsterdam"
    fecha = "01/10/2019"
    results = session.query(Flights.airline, Flights.arrival, Flights.date).filter(
        Flights.arrival.like(destino),
        Flights.date.like(fecha)
    )

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_flights = []
    for airline, arrival, date in results:
        flight_dict = {}
        flight_dict["airline"] = airline
        flight_dict["arrival"] = arrival
        flight_dict["date"] = date
        all_flights.append(flight_dict)

    return jsonify(all_flights)


if __name__ == '__main__':
    app.run(debug=True)
