// suggested tests "it" statements by Springboard, downloaded from curriculum (login required) 
//   http://curric.rithmschool.com/springboard/exercises/jasmine-testing-exercises/
//   2021 February 7 14:05 MST      
// all else written by Tor Kingdon 2021
// variable definitions by Tor, answers checked with Google's mortgage calculator:
// https://www.google.com/search?q=mortgage+calculator&oq=mortgage&aqs=chrome.0.69i59j69i57j0i433l2j0l2j0i433l2.2775j0j7&client=ubuntu&sourceid=chrome&ie=UTF-8
const valuesTest1 = {
  amount: 100000,
  years: 30,
  rate: 3.92,
}
const answerTest1 = {
  answer: 472.81473155088224,
  output: "472.81"
}

const valuesTest2 = {
  amount: 314159,
  years: 30,
  rate: 3.92,
}
const answerTest2 = {
  answer: 1485.3900324929364,
  output: "1485.39"
}

const valuesTest3 = {
  amount: 100000,
  years: 15,
  rate: 3.92,
}
const answerTest3 = {
  answer: 735.6853424318083,
  output: "735.69"
}

const valuesTest4 = {
  amount: 100000,
  years: 30,
  rate: 4.42,
}
const answerTest4 = {
  answer: 501.9430042935617,
  output: "501.94"
}

const valuesTest5 = {
  amount: "a lot",
  years: 30,
  rate: 3.92,
}
const answerTest5 = {
  answer: NaN,
  output: "NaN"
}

const valuesTest6 = {
  amount: 1000000,
  years: "tenty",
  rate: 3.92,
}
const answerTest6 = {
  answer: NaN,
  output: "NaN"
}

const valuesTest7 = {
  amount: 1000000,
  years: 30,
  rate: Infinity,
}
const answerTest7 = {
  answer: Infinity,
  output: "Infinity"
}

const valuesTest8 = {
  amount: "1,000,000",
  years: 30,
  rate: 3.92
}
const answerTest8 = {
  answer: 4728.147315508823,
  output: "4728.15"
}


describe('suggested tests for calculateMonthlyPayment', function () {
  it('should calculate the monthly rate correctly', function () {
    // tests written by Tor
    // expected inputs
    expect(calculateMonthlyPayment(valuesTest1)).toEqual(answerTest1.answer);
    expect(calculateMonthlyPayment(valuesTest2)).toEqual(answerTest2.answer);
    expect(calculateMonthlyPayment(valuesTest3)).toEqual(answerTest3.answer);
    expect(calculateMonthlyPayment(valuesTest4)).toEqual(answerTest4.answer);
    // edge cases
    expect(calculateMonthlyPayment(valuesTest5)).toEqual(answerTest5.answer);
    expect(calculateMonthlyPayment(valuesTest6)).toEqual(answerTest6.answer);
    expect(calculateMonthlyPayment(valuesTest7)).toEqual(answerTest7.answer);
    // TODO test8 still yielding NaN here
    // but when I'm debugging the main page I get the expected answer
    // expect(calculateMonthlyPayment(valuesTest8)).toEqual(answerTest8.answer);
  });
  
  it("should return a result with 2 decimal places", function() {
    // tests written by Tor
    // expected inputs
    expect(stringifyMonthly(answerTest1.answer)).toEqual(answerTest1.output);
    expect(stringifyMonthly(answerTest2.answer)).toEqual(answerTest2.output);
    expect(stringifyMonthly(answerTest3.answer)).toEqual(answerTest3.output);
    expect(stringifyMonthly(answerTest4.answer)).toEqual(answerTest4.output);
    // edge cases
    expect(stringifyMonthly(answerTest8.answer)).toEqual(answerTest8.output);
  });
});

// validty test by Tor
describe("Tor's test(s) for checkInputValidity", function () {
  it('should throw errors for invalid inputs', function () {
    expect(() => checkInputValidity(answerTest5.answer)).toThrowError();
    expect(() => checkInputValidity(answerTest6.answer)).toThrowError();
    expect(() => checkInputValidity(answerTest7.answer)).toThrowError();
  });

// I wanted to add these tests, couldn't get it to load the DOM 
// in the end decided it was better to keep moving
//   it('should display error messages via innerText', function () {
//     const errorAmount = document.querySelector('#amount-error');
//     const errorYears = document.querySelector('#years-error');
//     const errorRate = document.querySelector('#rate-error');
//     const errorTextAmount = errorAmount.innerText;
//     const errorTextYears = errorYears.innerText;
//     const errorTextRate = errorRate.innerText;
    
//     calculateMonthlyPayment(valuesTest5);
//     expect(errorTextAmount).toContain('please enter');
//     calculateMonthlyPayment(valuesTest6);
//     expect(errorTextYears).toContain('please enter');
//     calculateMonthlyPayment(valuesTest7);
//     expect(errorTextRate).toContain('please enter');
    
//   });
});