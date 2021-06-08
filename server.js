var express = require('express')

var app = express();

app.use(express.static('./orchard-pig-frontend'));

// app.get('/assets', function(req, res){
//     res.sendFile(__dirname + '/dist/assets');
// });

app.get('/*', function(req, res){
    res.sendFile('placeholder.html', {root: './orchard-pig-frontend'}
    );
});

var port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log('Express server running on port ' + port);
})