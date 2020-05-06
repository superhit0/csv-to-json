function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      resolve(e.target.result);
    });

    reader.readAsBinaryString(file);
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
  console.log(fileString);
}

document.getElementById('csvform').addEventListener('submit', csvSubmit, false);