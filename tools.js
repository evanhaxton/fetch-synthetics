// include file access utility
var fs = require("fs");

module.exports = {

  read_config : function(input_file, key) {
       var input = fs.readFileSync(input_file, 'utf8');
       var obj = JSON.parse(input);

       switch (key) {
         case 'API_KEY':
           return (obj.config.API_KEY);
           break;
         case 'CSV':
           return (obj.config.CSV);
           break;
         default:
           return('unknown');
       }

  },

  read_file : function(input_file) {
       var  input = fs.readFileSync(input_file, 'utf8');
       return input;
  },

  execute_command : function(command) {
      const execSync = require('child_process').execSync;
      var cmd = execSync(command.toString());
  },

  json_Equal : function(obj1,after) {

    var flag = true;

   for (j = 0; j < obj1.dashboard.widgets.length; j++) {

     // check that dashboard has nrql property and has been updated with new attributes

     if ((obj1.dashboard.widgets[j].data[0].hasOwnProperty('nrql')) && (obj1.dashboard.widgets[j].data[0].nrql.toString().includes(after.toString()))) {
            var flag = false;
            break;
     }
   }

   return(flag);
  },

  write_file : function(a,b) {
   try {
   fs.writeFileSync(a, JSON.stringify(b));
   } catch (err) {
     console.error(err)
   }
 },

 process_cmd : function(testFolder, cmd, API_KEY) {

  fs.readdir(testFolder, (err, dashboard) => {
    files.forEach(dashboard => {
    console.log(dashboard);
  });
});
},

 process_folder : function(sourceFolder, command, command1) {

  fs.readdirSync(sourceFolder).forEach(dashboard => {
     var cmd = command + dashboard + "'" + command1;
     console.log(cmd);
     const exec = require('child_process').exec;
     var cmd_process = exec(cmd.toString()).unref();
  })
 },

process_nextCursor : function(template, nextCursor) {

  var templateInput = fs.readFileSync(template, 'utf8');

  // populuate attributes
  var output = templateInput.replace("%nextCursor%",nextCursor);
  return output;
},

stringToBoolean: function(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
},

write_header: function(outputFile, header) {
try { 
  fs.writeFileSync(outputFile, header,{flag:'w'});   //'w' is write mode 
//  console.log("File written successfully"); 
  } catch(err) { 
    console.error(err); 
  } 
 },

csvBody: function(outputFile, entity) {
     var out_buffer = entity.name + ',' + entity.account.name + ',' + entity.monitorSummary.status + ',';
     out_buffer = out_buffer + entity.monitorSummary.successRate + ',';
     out_buffer = out_buffer + (entity.monitorSummary.locationsFailing || 0) + '/' + (entity.monitorSummary.locationsRunning || 0) + ',';
     out_buffer = out_buffer + entity.period + ',' + entity.monitorType + '\n';

//    console.log("outputFile " + outputFile);
//    console.log("out_buffer " + out_buffer);

    try { 
       fs.writeFileSync(outputFile, out_buffer,{flag:'a+'});   //'a+' is append mode 
//       console.log("File written successfully"); 
      } catch(err) { 
        console.error(err); 
      } 
},

clearCache: function(outputFile) {
  try { 
    fs.unlinkSync(outputFile);
  } catch(err) { 
    console.error(err); 
  } 
},

};
