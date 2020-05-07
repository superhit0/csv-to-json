const resultArea = document.getElementById('result-area');
const resultTextArea = document.getElementById('result');

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      resolve(e.target.result);
    });

    reader.readAsBinaryString(file);
  });
}

function getJsonFromCSVString(string) {
  const worker = new Worker('csv2json.js');
  worker.postMessage(string);
  return new Promise(resolve => {
    worker.onmessage = e => {
      resolve(e.data);
    }
  });
}

function displayResult(text) {
  resultTextArea.textContent = text;
  resultArea.classList.remove('no-display');
  resultTextArea.style.height = resultTextArea.scrollHeight + 'px';
}

async function csvSubmit(e) {
  e.preventDefault();
  const { files } = e.target.elements['csvinput'];
  if (files.length <= 0) {
    return;
  }
  const [ file ] = files;
  const fileString = await readFile(file);
  const jsonResult = await getJsonFromCSVString(fileString);
  const formattedResult = JSON.stringify(jsonResult, null, '\t');
  displayResult(formattedResult);
}

function copyResult() {
  resultTextArea.select();
  resultTextArea.setSelectionRange(0, resultTextArea.textContent.length);
  document.execCommand('copy');
  resultTextArea.blur();
}

function downloadFile(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function downloadResult() {
  const text = resultTextArea.textContent;
  downloadFile('jsonResult.json', text);
}

document.getElementById('csvform').addEventListener('submit', csvSubmit, false);
document.getElementById('copy-result').addEventListener('click', copyResult);
document.getElementById('download-result').addEventListener('click', downloadResult);