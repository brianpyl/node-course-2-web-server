const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Register middleware

app.use((req, res, next) => {
    var now = new Date().toString();
    //console.log(`${now}: ${req.method} ${req.url}`)
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

// put it here, can't access the static .html and hitting maintenance, without next()
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (test) => {
    return test.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Brian',
    //     likes: [
    //         'Biking',
    //         'Snowboard'
    //     ]
    // });

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my website!'  
    });
});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()  
    });
})


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
}); 

app.listen(port, () => {
    console.log(`Server is up on port ${port}...`);
});