
var db = require('../helpers/database');


function getfirstlevel(id,callback){
    const query = "SELECT * FROM bot WHERE request LIKE '__0%'";
    db.getConnection(function (err, connection) {
        if(err){
            callback(err);
        }else{
            connection.query(query, function (err, result) {
                connection.release();
                if (err) {
                    callback(err);
                } else {
                    callback(null,result);
                }
            });
        }
    });
}
function getReply(id,callback){

    const query = "SELECT * FROM bot WHERE request LIKE '"+id+"%' && SUBSTRING(request,"+(id.length+1)+",1) = ' '";
    db.getConnection(function (err, connection) {
        if(err){
            callback(err);
        }else{
            connection.query(query, function (err, result) {
                connection.release();
                if (err) {
                    callback(err);
                } else {
                    callback(null,result);
                }
            });
        }
    });
}

function getsecondlevel(id,callback){
    const query = "SELECT * FROM bot WHERE request BETWEEN '1.1' AND '1.4'";
    db.getConnection(function (err, connection) {
        if(err){
            callback(err);
        }else{
            connection.query(query, function (err, result) {
                connection.release();
                if (err) {
                    callback(err);
                } else {
                    callback(null,result);
                }
            });
        }
    });
}

function getthirdlevel(id,callback){
    const query = "SELECT * FROM bot WHERE request BETWEEN '2.1' AND '2.1.0'";
    db.getConnection(function (err, connection) {
        if(err){
            callback(err);
        }else{
            connection.query(query, function (err, result) {
                connection.release();
                if (err) {
                    callback(err);
                } else {
                    callback(null,result);
                }
            });
        }
    });
}


function getfourthlevel(id,callback){
    const query = "SELECT * FROM bot WHERE request='2.1 gCoin အရင္ဝယ္မယ္' OR request='2.2 gCoin ဝယ္ၿပီးၿပီ ဂိမ္းပိုက္ဆံေျပာင္းခ်င္လုိ႔'";
    db.getConnection(function (err, connection) {
        if(err){
            callback(err);
        }else{
            connection.query(query, function (err, result) {
                connection.release();
                if (err) {
                    callback(err);
                } else {
                    callback(null,result);
                }
            });
        }
    });
}





function retrieveReplySql(req,callback){
    const query = req === "Entry" ? "SELECT request FROM bot GROUP BY request" : "SELECT reply FROM bot WHERE request='" + req + "';";
    db.getConnection(function (err, connection) {
        if(err){
            callback(err);
        }else{
            connection.query(query, function (err, result) {
                connection.release();
                if (err) {
                    callback(err);
                } else {
                    callback(null,result);
                }
            });
        }
    });
}



function retrieveReply(req, callback) {
    const client = new Client({
        connectionString: connectionString,
        ssl: true,
    });
    client.connect();
    const query = req === "Entry" ? "SELECT request FROM \"AMK\" GROUP BY request" : "SELECT reply FROM \"AMK\" WHERE request='" + req + "';";
    client.query(query).then(res => {
        callback(res.rows.map(function (rec) { return !rec.reply ? rec.request : rec.reply }));
    }).catch(e => {
        client.end();
        console.error('query error', e.message, e.stack)
    })

}


function sendMessage(recipientId, message) {
    // request({
    //     url: 'https://graph.facebook.com/v2.6/me/messages',
    //     qs: { access_token: process.env.Facebook_Credential },
    //     method: 'POST',
    //     json: {
    //         recipient: { id: recipientId },
    //         message: message,
    //     }
    // }, function (error, response, body) {
    //     if (error) {
    //         console.log('Error sending message: ', error);
    //     } else if (response.body.error) {
    //         console.log('Error: ', response.body.error);
    //     }
    // });
    console.log(message.attachment.payload.elements[0].buttons);
};

  function buttonMsg(recipientId, text) {

    retrieveReply(text, function (resFromDb) {
        if (resFromDb.length === 0) {

            buttonMsg(recipientId, "Entry");
            return;
        }
        var buttonToReply = resFromDb.map(function (element) {
            return {
                "type": "postback",
                "title": element,
                "payload": element
            }
        });
        message = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Plz tap!",
                        "buttons": buttonToReply
                    }]
                }
            }
        };
        sendMessage(recipientId, message);
    });
};




exports.retrieveReply = retrieveReply;
exports.buttonMsg = buttonMsg;
exports.sendMessage = sendMessage;
exports.retrieveReplySql = retrieveReplySql;
//exports.getConnection = getConnection;
exports.getfirstlevel = getfirstlevel;
exports.getsecondlevel = getsecondlevel;
exports.getthirdlevel = getthirdlevel;
exports.getfourthlevel = getfourthlevel;
exports.getReply = getReply;