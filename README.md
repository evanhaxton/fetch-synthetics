# synthetics.tracker 

## Description

The script createsa csv file (synthetics.csv) that will output the current status of all running New Relic Synthetics scripts within the environment.  It is suggested that the user who executes the script have Admin access to capture all of the available content.   This program is available as open source and is to be used at the user's discretion.

## Required Software

- [Node.js and npm](https://nodejs.org/en/)

## Installation

1. Clone this repository to your computer. 

## Usage

### Updating dashboards 

1. Generate an User API New Relic Key.  Please note that a normal REST API Key is not sufficient to update dashboards 
2. Edit `dashboard.config` and set the following parameters: 

    - `API_KEY`: New Relic Generated User API Key

3. To run the script, open a Terminal window and execute `node fetch_synthetics.js`.

The output that is created is a csv file (synthetics.csv).  This file may be uploaded to a spreadsheet for further analysis
