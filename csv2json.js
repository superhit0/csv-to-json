function processRowToArray(row) {
  let isSemiColon = false;
  const tokens = row.split(',');
  const result = [];
  for (const token of tokens) {
    if (isSemiColon) {
      result.push(result.pop()+','+token);
    } else {
      result.push(token);
    }

    if(token.match(/\"/)) {
      isSemiColon = !isSemiColon;
    }
  }

  return result.map(item => item.replace(/"/g, ''));
}

function buildJSON(headers, rows) {
  return rows.map(row => {
    const item = {};
    for(let i=0;i<headers.length;i++) {
      item[headers[i]] = row[i];
    }
    return item;
  });
}

onmessage = e => {
  const [headers, ...rows]= e.data.split('\n').filter(row => row.length > 0).map(processRowToArray);
  return postMessage(buildJSON(headers, rows));
};