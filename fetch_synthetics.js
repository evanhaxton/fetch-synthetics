// required tools
var tools = require("./tools.js");

// Get Admin API Key from config file
var API_KEY  = tools.read_config('./synthetics.config','API_KEY');

// Define CSV File
var csvFile = './synthetics.csv'

// Define output cache
var outputFile = './synthetics.json';

// create header
var header = 'Name, Account, Monitor Status, Success Rate (24 Hours),Locations Failing, Period, Monitor Type' +  '\n';

// Write header for CSV
tools.write_header(csvFile, header); 

// Pagenation attributes
var pagenation = true;  
var chunk = 0;
var nextCursor = null;
var count = 0;

// Load first template
var dbinary = tools.read_file('./data_binary_first.txt');

while (pagenation) 
{ 

  //build command
  var downloadSynthetcisCommand = null;
  var downloadSyntheticsCommand = `curl https://api.newrelic.com/graphql -H 'Content-Type: application/json' -H 'API-KEY:${API_KEY}' -o ${outputFile} ${dbinary}`;

//   console.log(downloadSyntheticsCommand);

  //Download available dashboards 
  var cmd = tools.execute_command(downloadSyntheticsCommand);

  //convert content to JSON
  let outputData = tools.read_file(outputFile);
  var syntheticsJsonContent = JSON.parse(outputData);
  var entity = null;
  var nextCursor = syntheticsJsonContent.data.actor.entitySearch.results.nextCursor;

 // console.log("nextCursor = " + nextCursor);
 
  // check if another page is ready
  if (nextCursor == null) {
    var pagenation = false;
    // console.log("nextCursor is null\n");
  } else {
    var pagenation = true;
    var dbinary = tools.process_nextCursor('./data_binary_ongoing.txt', nextCursor);
    // console.log(dbinary);
  }

  // Process Synthetics
  for (i = 0; i < syntheticsJsonContent.data.actor.entitySearch.results.entities.length; i++) { 

     let entity = syntheticsJsonContent.data.actor.entitySearch.results.entities[i];
     tools.csvBody(csvFile, entity);
 //    var monitorName = entity.name;
 //    var account = entity.account.name;
 //    var monitorStatus = entity.monitorSummary.status;
 //    var successRate = entity.monitorSummary.successRate;
 //    var locations = (entity.monitorSummary.locationsFailing || 0) + '/' + (entity.monitorSummary.locationsRunning || 0);
 //    var period = entity.period;
 //    var monitorType = entity.monitorType;

     // console.log('count = ' + count++); 

  }

 }// pagenation loop

// Remove cache

tools.clearCache(outputFile);
