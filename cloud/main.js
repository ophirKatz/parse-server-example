
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hello!!!!!!#@!$#@$%!');
});
//this is the push function for client's use.
Parse.Cloud.define("sendPushToBusiness", function(request, response) {
  var senderUser = request.user;
  var id_key = request.params.installationId;
  var table_number = request.params.table_num;
  var table_req = request.params.table_request;
  var table_client_id = request.params.respondTo;

  // Validate that the sender is allowed to send to the recipient.
  // For example each user has an array of objectIds of friends

 

  // Send the push.
  // Find devices associated with the recipient user
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("installationId", id_key);
 
  // Send the push notification to results of the query
  Parse.Push.send({
    where: pushQuery,
    data: {
      table_num: table_number,
      table_request: table_req,
      respondTo: table_client_id
    }//,
     //action: "com.parse.push.intent.RECEIVE"
  },{useMasterKey: true}).then(function() {
      response.success("Push was sent successfully")
  }, function(error) {
      response.error("Push failed to send with error: " + error.message);
  });
});

//this is the push function for business's use.
Parse.Cloud.define("sendPushToClient", function(request, response) {
  var senderUser = request.user;
  var id_key = request.params.installationId;
  var table_req = request.params.table_request;
  var table_stat = request.params.table_status;

  // Validate that the sender is allowed to send to the recipient.
  // For example each user has an array of objectIds of friends

 

  // Send the push.
  // Find devices associated with the recipient user
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("installationId", id_key);
 
  // Send the push notification to results of the query
  Parse.Push.send({
    where: pushQuery,
    data: {
      request_type: table_req,
      request_status: table_stat
    }//,
     //action: "com.parse.push.intent.RECEIVE"
  },{useMasterKey: true}).then(function() {
      response.success("Push was sent successfully")
  }, function(error) {
      response.error("Push failed to send with error: " + error.message);
  });
});
