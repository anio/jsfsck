# jsf$ck ``+![]{}$` ``
  
jsf$ck is a fork from [jsfuck.com](http://www.jsfuck.com) that doesn't use parenthesis.


JSFuck is an esoteric and educational programming style based on the atomic parts of JavaScript. It uses only six different characters to write and execute code.

jsf$ck uses ``+![]{}$` `` instead of `+![]()`

It trades `()` for ``{}$` `` thanks to [the work of @garethheyes](http://blog.portswigger.net/2016/07/executing-non-alphanumeric-javascript.html)

It does not depend on a browser, so you can even run it on Node.js.

Demo: [centime.org/jsfsck](http://centime.org/jsfsck)

* *EXCLUSIVITY* jsf$ck: Compress the size of large sources (see explications below).

### Example

The following source will do an `alert(1)`:

```js
[][[![]+[]][+[]][+[]]+[[![]]+[][[]]][+[]][+!+[]+[+[]]]+[![]+[]]
[+[]][!+[]+!+[]]+[![]+[]][+[]][!+[]+!+[]]][[![]+{}][+[]][+!+[]+
[+[]]]+[[]+{}][+[]][+!+[]]+[[][[]]+[]][+[]][+!+[]]+[![]+[]][+[]
][!+[]+!+[]+!+[]]+[!![]+[]][+[]][+[]]+[!![]+[]][+[]][+!+[]]+[[]
[[]]+[]][+[]][+[]]+[![]+{}][+[]][+!+[]+[+[]]]+[!![]+[]][+[]][+[
]]+[[]+{}][+[]][+!+[]]+[!![]+[]][+[]][+!+[]]]`$${[![]+[]][+[]][
+!+[]]+[![]+[]][+[]][!+[]+!+[]]+[!![]+[]][+[]][!+[]+!+[]+!+[]]+
[!![]+[]][+[]][+!+[]]+[!![]+[]][+[]][+[]]+[[][[]]+[][[![]+[]][+
[]][+[]]+[[![]]+[][[]]][+[]][+!+[]+[+[]]]+[![]+[]][+[]][!+[]+!+
[]]+[![]+[]][+[]][!+[]+!+[]]]][+[]][!+[]+!+[]+[!+[]+!+[]]]+[+!+
[]]+[[+[]]+![]+[][[![]+[]][+[]][+[]]+[[![]]+[][[]]][+[]][+!+[]+
[+[]]]+[![]+[]][+[]][!+[]+!+[]]+[![]+[]][+[]][!+[]+!+[]]]][+[]]
[!+[]+!+[]+[+[]]]}$```
``` 

### Compress



It works by creating an array `$$$` where characters are stored according to their ascii number. Whenever it is shorter than our previous expression to get a character, we will now be able to use instead: `$$$[ ASCII_CODE ]`.

Notes:

* It adds an overhead of ~20k characters, so it is not to be used on already small outputs.

* It has the side-effect of creating a variable, named `$$$`.

* The js code of this page has been encoded (see source). Compression reduced it to `from 288k to 37k characters`.

* It is made possible by the fact that `$` is a valid literal.

Brief explanations:

The idea is to have a structure along the lines of :

```js
eval(
  '$$$=[...Array(255).keys()].map(f=&gt;unescape("%"+f.toString(16)))'
);
eval($$$[ ASCII_CODE_1 ]+$$$[ ASCII_CODE_2 ]+...)
```

Now, we can't use `\n` for new lines, nor `;`, so we will have to do in a single expression :

```js
// Theses solutions both work, but we either lose access to the return value, or it gets corrupted
[eval('$$$=[...Array...')][eval($$$[ ASCII_CODE ]+...)] //undefined
eval('$$$=[...Array...')+eval(+$$$[ ASCII_CODE ]+...) //undefined+RETURN_VALUE

// The solution is to ignore the return value of the affectation by making it a comment in a nested eval
// eg: eval('eval//'+undefined) //[Function: eval]
eval('eval//'+eval('$$$=[...Array...'))($$$[ ASCII_CODE ]+...) //RETURN_VALUE
```

Close enough, but we don't actually have access to `eval`. What we have is the `Function` constructor, called via template literals. We have to adjust accordingly:

```js
// If "Eval Source" is checked
Function`$${
  "return eval($)//"+
  Function`$${'$$$=[...Array...'}$```
}$`
`${$$$[ ASCII_CODE ]+...}`

// If just the plain string is requested
Function`$${
  "return $//"+
  Function`$${'$$$=[...Array...'}$```
}$`
`${$$$[ ASCII_CODE ]+...}`
```

And where does ```Function`$${"return eval($)"}$``${"STRING_TO_EVAL"}` ``` come from ? Well :

```js
> function f($,$){return $}([],'str')
'str'
> Function(['$','$'],'return $')([],'str')
'str'
> Function`$${'return $'}$``${'str'}`
'str'
```

Bonus:

```js
> Function`$${'return eval($+[])'}$$``'str'`
'str'
```

### Basics
              
    false       =>  ![]
    true        =>  !![]
    undefined   =>  [][[]]
    NaN         =>  +{}
    0           =>  +[]
    1           =>  +!+[]
    2           =>  !+[]+!+[]
    10          =>  [+!+[]]+[+[]]
    Array       =>  []
    Number      =>  +[]
    String      =>  []+[]
    Boolean     =>  ![]
    Function    =>  []["fill"]
    run         =>  []["fill"]["constructor"]( CODE )()

    run        =>  []["fill"]["constructor"]`$${ CODE }$```
    eval       =>  []["fill"]["constructor"]`$${"return eval($)"}$``${ Code }`
    
See the full list [here](https://github.com/centime/jsfsck/blob/master/jsfsck.js) and read the [JSFuck Wiki](https://github.com/aemkei/jsfuck/wiki) for a detailed explanation.  

### Links

* Demo [centime.org/jsfsck](http://centime.org/jsfsck)

* *ping me: [/u/centime](https://www.reddit.com/user/Centime/), [gmail](mailto:quelques.centimes@gmail.com)

* Template literals trick at [blog.portswigger.net](http://blog.portswigger.net/2016/07/executing-non-alphanumeric-javascript.html) (by [@garethheyes](https://twitter.com/garethheyes))

* Check out [JSFuck](http://jsfuck.com) (by [@aemkei](http://twitter.com/aemkei))

