// code provided by Springboard, downloaded from curriculum (login required) 
//   http://curric.rithmschool.com/springboard/exercises/jasmine-testing-exercises/
//   2021 February 7 14:05 MST      
// except as noted, written by Tor Kingdon 2021

// variable definitions by Tor
// const valuesObject = {};



window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  const valuesInput = {
    amount: (document.getElementById("loan-amount").value),
    years: (document.getElementById("loan-years").value),
    rate: (document.getElementById("loan-rate").value),
  }
  checkInputValidity(valuesInput);
  return valuesInput;
}

function checkInputValidity(values) {
  const errorAmount = document.querySelector('#amount-error');
  const errorYears = document.querySelector('#years-error');
  const errorRate = document.querySelector('#rate-error');
  let amountCheck = values.amount;
  let yearsCheck = values.years;
  let rateCheck = values.rate;

  // check amount  
  if (typeof amountCheck !== "number") {
    amountCheck = amountCheck.split(',').join('');
    amountCheck = amountCheck.split('$').join('');
    let tempAmount = amountCheck;
    amountCheck = parseInt(tempAmount);
    let amountInput = document.querySelector('#loan-amount');
    // TODO: this is not rewriting the screen
    amountInput.innerHTML = amountCheck;
  } 
  if (!amountCheck || amountCheck <= 0 || amountCheck === Infinity) {
    errorAmount.innerText = "please enter a valid positive number"
    throw new Error("invalid amount");
  } 
  // check years  
  if (yearsCheck !== "number") {
    let tempYears = yearsCheck;
    yearsCheck = parseInt(tempYears);
    let yearsInput = document.querySelector('#loan-years');
    yearsInput.innerText = yearsCheck;
  } 
  if (!yearsCheck || yearsCheck <= 0 || yearsCheck === Infinity) {
    errorYears.innerText = "please enter a valid positive number"
    throw new Error("invalid term");
  } 
  // check rate  
  if (typeof rateCheck !== "number") {
    let tempRate = rateCheck;
    rateCheck = parseFloat(tempRate);
    let rateInput = document.querySelector('#loan-rate');
    rateInput.innerHTML = rateCheck;      
  }
  if (!rateCheck || rateCheck <= 0 || rateCheck === Infinity) {
    errorRate.innerText = "please enter a valid positive number"
    throw new Error("invalid rate");
  }
  // still here? then let's
  values.amount = amountCheck;
  values.years = yearsCheck;
  values.rate = rateCheck;
  return values;
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
// Tor: "I'm not sure I understand the need for this function, but OK
// "except for the last line. I didn't call that fucntion,
// "I thought maybe it was there to set up test values, which I did in the test.js"
function setupIntialValues() {
  // function code by Tor Kingdon
  let amountInput = document.querySelector('#loan-amount');
  let yearsInput = document.querySelector('#loan-years');
  let rateInput = document.querySelector('#loan-rate');
  amountInput.value = "100000";
  yearsInput.value = "30";
  rateInput.value = "3.92";
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  // function code by Tor Kingdon
  const errorAmount = document.querySelector('#amount-error');
  const errorYears = document.querySelector('#years-error');
  const errorRate = document.querySelector('#rate-error');

  errorAmount.innerHTML = '';
  errorYears.innerHTML = '';
  errorRate.innerHTML = '';
  const valuesCalculate = getCurrentUIValues();
  const monthly = calculateMonthlyPayment(valuesCalculate);
  const output = stringifyMonthly(monthly);
  updateMonthly(output);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.

function calculateMonthlyPayment(values) {
  // function code by Tor Kingdon
  // who wants this output to be a number and to get converted in updateMonthly
  // return ((values.amount*values.rate)/(1-(1+values.rate)^(-1*(values.years/12))));
  const p = values.amount;
  const i = values.rate*0.01/12;
  const n = values.years*12;
  return ((p*i)/(1-Math.pow((1+i),(-1*n))));
  // return parseFloat(monthly).toFixed(2)
  // there's still something fucked in that equation. ob.
}

function stringifyMonthly(monthly) {
  return parseFloat(monthly).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(output) {
  // function code by Tor Kingdon
  const monthlyOutput = document.querySelector('#monthly-payment');
  monthlyOutput.innerText = output;
}
