"use strict";

//BMI = Berat Badan (kg) / (Tinggi Badan (m) x Tinggi Badan (m)).

const resultTitle = document.querySelector(".result-title");
const resultDesc = document.querySelector(".result-description");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
let heightValue = 0;
let weightValue = 0;
let timeout;

// get realtime result height and weight
[height, weight].forEach((input) => {
  input.addEventListener("input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(bmiFunction, 500);
  });
});

// classification bmi result
function classifyBMI(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal Weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

// range ideal weight based on bmi
function calculateIdealWeight(height) {
  const heightInMeter = height;
  const minWeight = (18.5 * (heightInMeter * heightInMeter)).toFixed(1);
  const maxWeight = (24.9 * (heightInMeter * heightInMeter)).toFixed(1);
  return `${minWeight} - ${maxWeight} kg`;
}

// function to get BMI and manipulate DOM
const bmiFunction = function () {
  const heightValue = parseFloat(height.value) / 100;
  const weightValue = parseFloat(weight.value);

  let BMI = weightValue / (heightValue * heightValue);

  if (heightValue && weightValue && heightValue > 0 && weightValue > 0) {
    resultTitle.textContent = `Your BMI is...  `;

    const bmiResult = `<span class="bmi-result">${BMI.toFixed(2)}</span>`;
    resultTitle.insertAdjacentHTML("beforeend", bmiResult);

    resultDesc.textContent = `Your BMI suggests you're ${classifyBMI(
      BMI
    )}, Your ideal weight is between ${calculateIdealWeight(heightValue)}`;
  } else {
    resultTitle.textContent = "input correct number";
    resultDesc.textContent =
      "input height and weight number correctly, at least > 0";
  }
};
