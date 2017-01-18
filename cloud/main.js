
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define("sendPushToUser", function(request, response) {
  var senderUser = request.user;
  var id_key = request.params.id_key;
  var message = request.params.message;

  // Validate that the sender is allowed to send to the recipient.
  // For example each user has an array of objectIds of friends

  // Validate the message text.
  // For example make sure it is under 140 characters
  if (message.length > 140) {
  // Truncate and add a ...
    message = message.substring(0, 137) + "...";
  }

  // Send the push.
  // Find devices associated with the recipient user
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("id_key", id_key);
 
  // Send the push notification to results of the query
  Parse.Push.send({
    where: pushQuery,
    data: {
      alert: message
    }
  }).then(function() {
      response.success("Push was sent successfully.")
  }, function(error) {
      response.error("Push failed to send with error: " + error.message);
  });
});
