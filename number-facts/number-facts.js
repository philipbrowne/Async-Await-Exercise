const BASE_URL = 'http://numbersapi.com/';
const numbers = [1, 42, 54, 67, 96];

function makeNumStr(numArray) {
  let numStr = '';
  for (let i = 0; i < numArray.length - 1; i++) {
    numStr += `${numArray[i]},`;
  }
  numStr += `${numArray[numArray.length - 1]}`;
  return numStr;
}

// Promise Syntax
// axios
//   .get(`${BASE_URL}${makeNumStr(numbers)}`)
//   .then((res) => {
//     for (let key of Object.keys(res.data)) {
//       $('#num-list').append(`<li>${res.data[key]}</li>`);
//     }
//   })
//   .catch((err) => console.log(err));

// Async/Await ES2017 Syntax
async function makeNumList() {
  try {
    let { data } = await axios.get(`${BASE_URL}${makeNumStr(numbers)}`);
    for (let key of Object.keys(data)) {
      $('#num-list').append(`<li>${data[key]}</li>`);
    }
  } catch (e) {
    console.log('Something went wrong', e);
  }
}
makeNumList();

// const FAVE_NUM = 42;
// Promise.all(fourNumberPromises).then((faveNumFacts) => {
//   for (let res of faveNumFacts) {
//     $('#fave-num-facts').append(`<li>${res.data.text}</li>`);
//   }
// });

async function getFourNumberFacts(number) {
  let fourNumberPromises = [];
  try {
    for (i = 1; i < 5; i++) {
      fourNumberPromises.push(axios.get(`${BASE_URL}${number}?json`));
    }
    let numFacts = await Promise.all(fourNumberPromises);
    for (let res of numFacts) {
      $('#fave-num-facts').append(`<li>${res.data.text}</li>`);
    }
  } catch (e) {
    console.log('Something went wrong', e);
  }
}

getFourNumberFacts(42);
