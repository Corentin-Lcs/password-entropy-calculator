window.onload = () => {
  initializeUIElements();
  addEventListeners();
  entropyCalculator();
};

const initializeUIElements = () => {
  document.getElementById("password-length-display").value = document.getElementById("password-length").value;
};

const addEventListeners = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.addEventListener("change", handleCheckboxChange));
  document.getElementById("password-length").addEventListener("input", handleRangeInputChange);
  document.getElementById("password-length-display").addEventListener("input", handleDisplayInputChange);
};

const handleRangeInputChange = () => {
  syncInputs();
  entropyCalculator();
};

const handleDisplayInputChange = () => {
  const displayInput = document.getElementById("password-length-display");
  const value = parseInt(displayInput.value);
  if (isValidPasswordLength(value)) {
    document.getElementById("password-length").value = value;
    entropyCalculator();
  } else {
    resetDisplayInput();
  }
};

const syncInputs = () => {
  const rangeInput = document.getElementById("password-length");
  document.getElementById("password-length-display").value = rangeInput.value;
};

const resetDisplayInput = () => {
  const rangeInput = document.getElementById("password-length");
  document.getElementById("password-length-display").value = rangeInput.value;
};

const isValidPasswordLength = (value) => !isNaN(value) && value >= 12 && value <= 256;

const handleCheckboxChange = (event) => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  if (checkboxes.length === 0) {
    event.target.checked = true;
  }
  entropyCalculator();
};

const entropyCalculator = () => {
  const length = parseInt(document.getElementById("password-length").value);
  const charsetSize = getCharsetSize();
  const entropy = length * Math.log2(charsetSize);
  const { description, className } = getPasswordStrength(entropy);
  const entropyOutput = document.getElementById("entropy-output");
  entropyOutput.innerHTML = `The password entropy of <span class="bold">${length}</span> symbols randomly selected from a set of <span class="bold">${charsetSize}</span> characters is <span class="bold">${entropy.toFixed(0)}</span> bits. This password is theoretically <span class="bold ${className}">${description}</span>.`;
};

const getCharsetSize = () => {
  const charsetOptions = {
    "include-lowercase": "abcdefghijklmnopqrstuvwxyz",
    "include-uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "include-accented-lowercase": "àâäæçéèêëîïôöœùûüÿ",
    "include-accented-uppercase": "ÀÂÄÆÇÉÈÊËÎÏÔÖŒÙÛÜŸ",
    "include-foreign-lowercase": "áãåðíìñóòõøúýß",
    "include-foreign-uppercase": "ÁÃÅÐÍÌÑÓÒÕØÚÝẞ",
    "include-numbers": "0123456789",
    "include-binary-numbers": "01",
    "include-symbols": "!@#$%^&*()_+-=[]{}|;:,.<>?",
    "include-currency-symbols": "฿₿₳৲৳$£₵¢₡៛₫€₣ƒ₲₴₺₭₦₱₽₹₨₪₸₮₩¥¤"
  };
  return Object.keys(charsetOptions).reduce((acc, key) => {
    if (document.getElementById(key).checked) acc += charsetOptions[key].length;
    return acc;
  }, 0);
};

const getPasswordStrength = (entropy) => {
  const thresholds = [
    { limit: 64, description: "very weak", className: "very-weak" },
    { limit: 80, description: "weak", className: "weak" },
    { limit: 100, description: "medium", className: "medium" },
    { limit: 128, description: "strong", className: "strong" },
    { limit: 256, description: "very strong", className: "very-strong" }
  ];
  for (const threshold of thresholds) {
    if (entropy < threshold.limit) return { description: threshold.description, className: threshold.className };
  }
  return { description: "extremely strong", className: "extremely-strong" };
};