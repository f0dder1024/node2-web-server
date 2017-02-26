const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next)=>{

    let now = new Date().toString();
    const log = `timestamp: ${now}: ${req.method}  ${req.url} `
    console.log(log);
    fs.appendFileSync('server.log', log+'\n');
    //console.log(req);
    next();
});

app.use((req, res, next)=>{
    res.render('maintenance.hbs');
   //next();
});

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    //res.send('<h1>Hello Express!!</h1>');

    res.render('home.hbs', {
        pageTitle: 'Maintenance Page',
        currentYear: new Date().getFullYear(),
        welcomeText: 'Hello Maggots!!'
    })
});


app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'Maintenance Page',
    });
})

app.get('/bad', (req, res)=>{
    res.send({
        error: 'Error, bad route encountered'
    })
})


app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});