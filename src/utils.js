function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setValue(month, year) {
  const row = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let i = 0; i < daysInMonth; i++) {
    const day = new Date(year, month - 1, i + 1);
    const val = day.getDay();
    if (![0, 6].includes(val)) {
      const valIn = `08:${getRndInteger(15, 29)}`;
      const valOut = `17:${getRndInteger(31, 55)}`;
      row.push(valIn, valOut);
    } else {
      row.push('', '');
    }
  }
  return [row];
}

module.exports = { getRndInteger, setValue }; 