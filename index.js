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

  console.log(await readFile(file));
}

document.getElementById('csvform').addEventListener('submit', csvSubmit, false);