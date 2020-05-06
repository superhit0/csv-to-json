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

async function csvSubmit(e) {
  e.preventDefault();
  const { files } = e.target.elements['csvinput'];
  if (files.length <= 0) {
    return;
  }
  const [ file ] = files;
  const fileString = await readFile(file);
  console.log(await getJsonFromCSVString(fileString));
}

document.getElementById('csvform').addEventListener('submit', csvSubmit, false);