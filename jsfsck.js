/*! jsf$ck 0.1.0 - centime.org/jsfsck */

(function(self){

  var USE_CHAR_CODE = "USE_CHAR_CODE";

  var MIN = 32, MAX = 126;

  var SIMPLE = {
    'false':      '![]',
    'true':       '!![]',
    'undefined':  '[][[]]',
    'NaN':        '+{}',
    'Infinity':   '+[+!+[]+[!+[]+[]][+[]][!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]]+[+[]]][+[]]', // +"1e1000"
  };

  var CONSTRUCTORS = {
    'Array':    '[]',
    'Number':   '[+[]][0]',
    'String':   '[[]+[]][0]',
    'Boolean':  '[![]][0]',
    'Function': '[]["fill"]',
    'RegExp':   'Function`$$${"return/"+false+"/"}$$```' // Wut ?
  };


  var MAPPING = {
    'a':   '[false+""][0][1]',
    'b':   '[[][+[]]+{}][0][11]',
    'c':   '[![]+{}][0][10]',
    'd':   '[undefined+""][0][2]',
    'e':   '[true+""][0][3]',
    'f':   '[false+""][0][0]',
    'g':   '[false+[0]+String][0][20]',
    'h':   'Function`$${"return "+1+0+1+"..toString("+2+1+")"}$```[1]',
    'i':   '[[false]+undefined][0][10]',
    'j':   '[[]+{}][0][10]',
    'k':   'Function`$${"return "+2+0+"..toString("+2+1+")"}$```',
    'l':   '[false+""][0][2]',
    'm':   '[Number+""][0][11]',
    'n':   '[undefined+""][0][1]',
    'o':   '[[]+{}][0][1]',
    'p':   'Function`$${"return "+2+1+1+"..toString("+3+1+")"}$```[1]',
    'q':   'Function`$${"return "+2+1+2+"..toString("+3+1+")"}$```[1]',
    'r':   '[true+""][0][1]',
    's':   '[false+""][+[]][3]',
    't':   '[true+""][+[]][0]',
    'u':   '[undefined+""][+[]][0]',
    'v':   'Function`$${"return "+3+1+"..toString("+3+2+")"}$```',
    'w':   'Function`$${"return "+3+2+"..toString("+3+3+")"}$```',
    'x':   'Function`$${"return "+1+0+1+"..toString("+3+4+")"}$```[1]',
    'y':   '[NaN+[Infinity]][+[]][10]',
    'z':   'Function`$${"return "+3+5+"..toString("+3+6+")"}$```',

    'A':   '[+[]+Array][0][10]',
    'B':   '[+[]+Boolean][0][10]',
    'C':   'Function`$${"return escape"}$````${false}`[2]',
    'D':   'Function`$${"return escape"}$````]`[2]',
    'E':   '[RegExp+""][0][12]',
    'F':   '[+[]+Function][0][10]',
    'G':   '[false+Function`$${"return Date"}$`````][0][30]',
    'H':   USE_CHAR_CODE,
    'I':   '[Infinity+""][0][0]',
    'J':   USE_CHAR_CODE,
    'K':   USE_CHAR_CODE,
    'L':   USE_CHAR_CODE,
    'M':   '[true+Function`$${"return Date"}$`````][0][30]',
    'N':   '[NaN+""][0][0]',
    'O':   '[!![]+{}][0][12]',
    'P':   USE_CHAR_CODE,
    'Q':   USE_CHAR_CODE,
    'R':   '[+[]+RegExp][0][10]',
    'S':   '[+[]+String][0][10]',
    'T':   '[NaN+Function`$${"return Date"}$`````][0][30]',
    'U':   '[NaN+Function`$${"return toString()"}$```][0][11]',
    'V':   USE_CHAR_CODE,
    'W':   USE_CHAR_CODE,
    'X':   USE_CHAR_CODE,
    'Y':   USE_CHAR_CODE,
    'Z':   USE_CHAR_CODE,

    ' ':   '[!![]+{}][0][11]',
    '!':   '`!`',
    '"':   'Function`$${"return "+`[[]+[]][+[]]`+".fontcolor()"}$```[12]',
    '#':   USE_CHAR_CODE,
    '$':   '`$`',
    '%':   'Function`$${"return escape"}$````[`[0]',
    '&':   USE_CHAR_CODE,
    '\'':  USE_CHAR_CODE,
    '(':   '[undefined+[]["fill"]][0][22]',
    ')':   '[[0]+false+[]["fill"]][0][20]',
    '*':   USE_CHAR_CODE,
    '+':   '`+`',
    ',':   'Function`$${"return unescape"}$````${[]}`', // '([]["slice"]["call"](false+"")+"")[1]',
    '-':   '[+[.+[0000000001]][+[]]+""][+[]][2]',
    '.':   '[+[+!+[]+[+!+[]]+[!![]+[]][+[]][!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]]][+[]]+[]][+[]][+!+[]]',
    '/':   'Function`$${"return "+`[[]+[]][+[]]`+".italics()"}$```[4]',
    ':':   '[Function`$${"return "+RegExp["name"]+"()"}$```+[]][0][3]',
    ';':   USE_CHAR_CODE, // '("")["link"](")[14]',
    '<':   'Function`$${"return "+`[[]+[]][+[]]`+".italics()"}$```[0]',
    '=':   'Function`$${"return "+`[[]+[]][+[]]`+".fontcolor()"}$```[11]',
    '>':   'Function`$${"return "+`[[]+[]][+[]]`+".italics()"}$```[2]',
    '?':   '[Function`$${"return "+RegExp["name"]+"()"}$```+[]][0][2]',
    '@':   USE_CHAR_CODE,
    '[':   '`[`',
    '\\':  USE_CHAR_CODE,
    ']':   '`]`',
    '^':   USE_CHAR_CODE,
    '_':   USE_CHAR_CODE,
    '`':   USE_CHAR_CODE,
    '{':   '`{`',
    '|':   USE_CHAR_CODE,
    '}':   '`}`',
    '~':   USE_CHAR_CODE
  };

  var GLOBAL = 'Function("return this")()';

  function fillMissingChars(){
    for (var key in MAPPING){
      if (MAPPING[key] === USE_CHAR_CODE){
        // MAPPING[key] = 'Function`$${"return unescape(\"%'+ key.charCodeAt(0).toString(16).replace(/(\d+)/g, "+($1)+\"") + ')"}$```';
        MAPPING[key] = encode('return unescape("%'+key.charCodeAt(0).toString(16)+'")',true,false);
      }
    }
  }

  function fillMissingDigits(){
    var output, number, i;

    for (number = 0; number < 10; number++){

      output = "+[]";

      if (number > 0){ output = "+!" + output; }
      for (i = 1; i < number; i++){ output = "+!+[]" + output; }
      if (number > 1){ output = output.substr(1); }

      MAPPING[number] = "[" + output + "]";
    }
  }

  function replaceMap(){
    var character = "", value, original, i, key;

    function replace(pattern, replacement){
      value = value.replace(
        new RegExp(pattern, "gi"),
        replacement
      );
    }

    function digitReplacer(_,x) { return MAPPING[x]; }

    function numberReplacer(_,y) {
      var values = y.split("");
      var head = +(values.shift());
      var output = "+[]";

      if (head > 0){ output = "+!" + output; }
      for (i = 1; i < head; i++){ output = "+!+[]" + output; }
      if (head > 1){ output = output.substr(1); }

      return [output].concat(values).join("+").replace(/(\d)/g, digitReplacer);
    }

    for (i = MIN; i <= MAX; i++){
      character = String.fromCharCode(i);
      value = MAPPING[character];
      if(!value) {continue;}
      original = value;


      for (key in CONSTRUCTORS){
        replace("\\b" + key, CONSTRUCTORS[key] + '["constructor"]');
      }


      for (key in SIMPLE){
        replace(key, SIMPLE[key]);
      }


      replace('(\\d\\d+)', numberReplacer);
      replace('\\((\\d)\\)', digitReplacer);
      replace('\\[(\\d)\\]', digitReplacer);

      replace("GLOBAL", GLOBAL);
      replace('\\+""', "+[]");
      replace('""', "[]+[]");

      MAPPING[character] = value;

    }
  }

  function replaceStrings(){
    var regEx = /[^\[\]\!\+\{\}\$\`]{1}/g,
      all, value, missing,
      count = MAX - MIN;

    function findMissing(){
      var all, value, done = false;

      missing = {};

      for (all in MAPPING){

        value = MAPPING[all];

        if (value.match(regEx)){
          missing[all] = value;
          done = true;
        }
      }
      return done;
    }

    function mappingReplacer(a, b) {
      return b.split("").join("+");
    }

    function valueReplacer(c) {
      return missing[c] ? c : MAPPING[c];
    }

    for (all in MAPPING){
      MAPPING[all] = MAPPING[all].replace(/\"([^\"]+)\"/gi, mappingReplacer);
    }

    while (findMissing()){
      for (all in missing){
        value = MAPPING[all];
        value = value.replace(regEx, valueReplacer);

        MAPPING[all] = value;
        missing[all] = value;
      }

      if (count-- === 0){
        console.error("Could not compile the following chars:", missing);
      }
    }
  }


  MAPPING_COMPRESS = {};
  // small optimization over JSFuck's way to write numbers over 10
  var mapNumbers=['+[]','+!+[]','!+[]+!+[]','!+[]+!+[]+!+[]','!+[]+!+[]+!+[]+!+[]','!+[]+!+[]+!+[]+!+[]+!+[]','!+[]+!+[]+!+[]+!+[]+!+[]+!+[]','!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]','!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]','!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]'];

  function rewriteNumber(n){
    return String(n).split('').join('+')
        // .replace(/(\d)/,(_,i) => mapNumbers[i])
        // .replace(/(\d)/g,(_,i) => '['+mapNumbers[i]+']')
        .replace(/(\d)/, function(_,i){ return mapNumbers[i]})
        .replace(/(\d)/g, function(_,i){ return '['+mapNumbers[i]+']'})
  }

  function mapCompress(){
    for (var i=MIN;i<MAX;i++){
      character = String.fromCharCode(i);
      reWrittenChar = '$$$['+rewriteNumber(i)+']';
      if (MAPPING[character].length > reWrittenChar.length){
        MAPPING_COMPRESS[character] = reWrittenChar;
      } else {
        MAPPING_COMPRESS[character] = MAPPING[character];
      }
    }
  }

  // compress +eval -parent // Not implemented
  // [Function`$${"$$$=[...Array(255).keys()].map(f=>unescape("%"+f.toString(16)))"}$```][Function`$${$$$[97]}$```]
  // compress -eval +parent
  // Function`$${"return $//"+Function`$${'$$$=[...Array(255).keys()].map(f=>unescape("%"+f.toString(16)))'}$```}$``${$$$[97]}`
  // compress +eval +parent
  // Function`$${"return eval($)//"+Function`$${'$$$=[...Array(255).keys()].map(f=>unescape("%"+f.toString(16)))'}$```}$``${$$$[97]}`
  function compress(input, wrapWithEval){
    mapCompress();
    output = "[][" + encode("fill") + "]" + "[" + encode("constructor") + "]" +
          "`$${" + ((wrapWithEval)? encode('return eval($)//') : encode('return $//')) +
            "+[][" + encode("fill") + "]" + "[" + encode("constructor") + "]" +
              "`$${" + 
                  encode('$$$=[...Array(255).keys()].map(f=>unescape("%"+f.toString(16)))')+
              "}$```"+
          "}$``${" +
            encode(input,false,false,false,true)+
          "}$`";
    return output
  }


  function encode(input, wrapWithEval, runInParentScope, compressCode, compressingRun){


    var output = [];

    if (!input){
      return "";
    }

    var r = "";
    for (var i in SIMPLE) {
      r += i + "|";
    }
    r+=".";

    input.replace(new RegExp(r, 'g'), function(c) {
      var replacement = SIMPLE[c];
      if (replacement) {
        output.push("[" + replacement + "]+[]");
      } else {
        replacement = (compressingRun)? MAPPING_COMPRESS[c] : MAPPING[c];
        if (replacement){
          output.push(replacement);
         } // else {
        //   replacement =
        //     "[[]+[]][+[]][" + encode("constructor") + "]" +
        //     "[" + encode("fromCharCode") + "]" +
        //     "[" + encode(c.charCodeAt(0) + "") + "][+[]]";

        //   output.push(replacement);
        //   MAPPING[c] = replacement;

        // }
      }
    });

    output = output.join("+");

    if (/^\d$/.test(input)){
      output += "+[]";
    }


    if (compressCode){        
        output = compress(input, wrapWithEval);
    } else if (wrapWithEval){
      if (runInParentScope){
        // Function`$${"return eval($[0])"}$$``1+4`
        // Function`$${"return eval($)"}$``${"1+4"}`
        output = "[][" + encode("fill") + "]" +
          "[" + encode("constructor") + "]" +
          "`$${"+encode("return eval($)")+"}$``${"+output+"}`";
      } else {
        output = "[][" + encode("fill") + "]" +
          "[" + encode("constructor") + "]" +
          "`$${" + output + "}$```";
      }
    }
    return output;
  }

  fillMissingDigits();
  fillMissingChars();
  replaceMap();
  replaceStrings();


  function test(){
    for (i = MIN; i <= MAX; i++){
      character = String.fromCharCode(i);
      encoded = encode(character);
      if (character !== eval(encoded)){
        console.log('Broken: '+character);
      }
      if (/\(|\)/.test(encoded)){
        console.log('Parenthesis  found in: '+character); 
      }
      console.log('Tests completed');
    }
  }

  self.jsfsck = {
    encode: encode,
    test: test,
    MAPPING: MAPPING,
    MAPPING_COMPRESS: MAPPING_COMPRESS
  };
})(typeof(exports) === "undefined" ? window : exports);
