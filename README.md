# jsf$ck ``+![]{}$` ``
  
jsf$ck is a fork from [jsfuck.com](http://www.jsfuck.com).


JSFuck is an esoteric and educational programming style based on the atomic parts of JavaScript. It uses only six different characters to write and execute code.

jsf$ck doesn't use the same characters as JSFuck. It uses ``+![]{}$` `` instead of `+![]()`

It trades `()` for ``{}$` ``

It does not depend on a browser, so you can even run it on Node.js.

Demo: [centime.org/jsfsck](http://centime.org/jsfsck)

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



It works by creating an array `$$$` where characters are stored following their ascii number. Whenever it is shorter than our previous expression to get a character, we will now be able to use instead: `$$$[ ASCII_CODE ]`.

Notes:

* It adds an overhead of ~20k characters, so use it is not to be used on already small outputs.

* It has the side-effect of creating a variable, named `$$$`.

* It works rather well, for example the js code of this page has been encoded (see source). Compression reducedit to `37k characters vs 288k previously`.

* It is made possible by the fact that `$` is a valid character in variable names.

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
[eval('$$$=[...Array...')][eval($$$[ ASCII_CODE ]+...)]
eval('$$$=[...Array...')+eval(+$$$[ ASCII_CODE ]+...)

// The solution is to ignore the return value of the affectation by making it a comment in a nested eval
eval('eval//'+eval('$$$=[...Array...'))($$$[ ASCII_CODE ]+...)
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

ps: I might write some more to explain where ```Function`$${"return eval($)"}$``${"STRING_TO_EVAL"}` ``` comes from, but if you see this and are interested ping me* and I'll get it done.



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

* Parenthesis trick at [blog.portswigger.net](http://blog.portswigger.net/2016/07/executing-non-alphanumeric-javascript.html) (by [@garethheyes](https://twitter.com/garethheyes))

* Check out [JSFuck](http://jsfuck.com) (by [@aemkei](http://twitter.com/aemkei))

