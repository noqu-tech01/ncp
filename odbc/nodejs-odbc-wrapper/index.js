// Remove duplicate requires
const ffi = require('ffi-napi');
const ref = require('ref-napi');
const path = require('path');
const fs = require('fs');

// Define basic types
const SQLHSTMT = ref.types.void; // opaque pointer
const SQLRETURN = ref.types.int;
const SQLUSMALLINT = ref.types.ushort;
const SQLCHAR = ref.types.CString;
const SQLSMALLINT = ref.types.short;
const SQLULEN = ref.types.ulong;
const SQLPOINTER = ref.refType(ref.types.void);
const SQLLEN = ref.types.long;
const SQLINTEGER = ref.types.int;
const SQLUINTEGER = ref.types.uint;
const SQLUSMALLINTPtr = ref.refType(SQLUSMALLINT);
const SQLSMALLINTPtr = ref.refType(SQLSMALLINT);
const SQLLENPtr = ref.refType(SQLLEN);
const SQLCHARPtr = ref.refType(SQLCHAR);

function findUnixODBCLib() {
  const possiblePaths = [
    '/usr/local/lib/libodbc.dylib',
    '/usr/lib/libodbc.dylib',
    '/opt/homebrew/lib/libodbc.dylib',
    '/opt/homebrew/Cellar/unixodbc/2.3.12/lib/libodbc.dylib',
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  throw new Error('unixODBC shared library not found in common locations');
}

const unixODBCLibPath = findUnixODBCLib();

const libodbc = ffi.Library(unixODBCLibPath, {
  '_SQLSpecialColumns': [SQLRETURN, [SQLHSTMT, SQLUSMALLINT, SQLCHAR, SQLSMALLINT, SQLCHAR, SQLSMALLINT, SQLCHAR, SQLSMALLINT, SQLUSMALLINT, SQLUSMALLINT]],
  '_SQLTables': [SQLRETURN, [SQLHSTMT, SQLCHAR, SQLSMALLINT, SQLCHAR, SQLSMALLINT, SQLCHAR, SQLSMALLINT, SQLCHAR, SQLSMALLINT]],
  '_SQLSetParam': [SQLRETURN, [SQLHSTMT, SQLUSMALLINT, SQLSMALLINT, SQLSMALLINT, SQLULEN, SQLSMALLINT, SQLPOINTER, SQLLENPtr]],
  // Add other functions as needed
});

module.exports = {
  CLSpecialColumns: libodbc.CLSpecialColumns,
  CLTables: libodbc.CLTables,
  CLSetParam: libodbc.CLSetParam,
  // Export other functions as needed
};
