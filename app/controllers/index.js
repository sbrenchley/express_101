var express = require('express')
var router = express.Router()

// one day we could load a more modular set of routes with something like
// router.use('/comments', require('./comments'))

router.get('/', function(req, res) {
  res.render('home')
})

router.get('/price', function(req, res) {
  var price = 0;
  var error = false;
  var weight = req.query.weight;
  var letterType = req.query.letterType;

  var prettyLetterType = letterType;
  switch (letterType) {
    case "letters_stamped": {
      prettyLetterType = "Letter (Stamped)";
      break;
    }
    case "letters_metered": {
      prettyLetterType = "Letter (Metered)";
      break;
    }
    case "parcels": {
      prettyLetterType = "Parcels"
      break;
    }
    case "large_envelopes": {
      prettyLetterType = "Large Envelopes";
      break;
    }

  }

  if (weight == 3.5) {
    weight = 3.5;
  }
  else {
    weight = Math.round(req.query.weight);
  }



  if(letterType == "large_envelopes") {
    if (weight >= 2 && weight <= 13) {
      price = ((weight-1) * 0.21) + 0.98;
    }
    else if (weight <= 1) {
      price = 0.98;
    }
    else if (weight > 13) {
      error = "Large Envelopes cannot contain weight greater than 13 oz";
    }
  }

  if(letterType == "letters_stamped") {
    if (weight >= 2 && weight < 3.5) {
      price = ((weight-1) * 0.21) + 0.49;
    }
    else if (weight <= 1) {
      price = 0.49;
    }
    else if (weight == 3.5) {
      price = 1.12;
    }
    else if (weight > 3.5) {
      error ="Letters (stamped) cannot contain weight greater than 3.5 oz";
    }
  }

  if(letterType == "letters_metered") {
    if (weight >= 2 && weight < 3.5) {
      price = ((weight-1) * 0.21) + 0.46;
    }
    else if (weight <= 1) {
      price = 0.46;
    }
    else if (weight == 3.5) {
      price = 1.09;
    }
    else if (weight > 3.5) {
      error = "Letters (metered) cannot contain weight greater than 3.5 oz";
    }
  }

  if(letterType == "parcels") {
    if (weight <= 4) {
      price = 2.67;
    }
    else if (weight >= 5 && weight <= 13 ) {
      price = ((weight-1) * 0.18) + 2.67;
    }
    else if (weight > 13) {
      error = "Parcels cannot contain weight greater than 13 oz";
    }
  }

  res.render('price', { price: price.toFixed(2),
                        weight: req.query.weight,
                        letterType: prettyLetterType,
                        error: error });
  console.log(weight);
  console.log(price);
})

module.exports = router

// error = false otherwise = string
// price = 0
