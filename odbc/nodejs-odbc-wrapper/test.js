const odbc = require('./index');

// Example usage (dummy parameters, replace with actual handles and values)
try {
  const ret = odbc.CLSpecialColumns(null, 0, null, 0, null, 0, null, 0, 0, 0);
  console.log('CLSpecialColumns returned:', ret);
} catch (err) {
  console.error('Error calling CLSpecialColumns:', err);
}
