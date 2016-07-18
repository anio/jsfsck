# jsf$ck `+![]{}$\``
  
jsf$ck is a fork from [jsfuck.com](http://www.jsfuck.com).


JSFuck is an esoteric and educational programming style based on the atomic parts of JavaScript. It uses only six different characters to write and execute code.

jsf$ck doesn't use the same characters as JSFuck. It uses `+![]{}$\`` instead of `+![]()`

It trades `()` for `{}$\``

It does not depend on a browser, so you can even run it on Node.js.

Demo: [centime.org/jsfsck](http://centime.org/jsfsck)

### Example

The following source will do an `alert(1)`:

```js
[][[![]+[]][+[]][+[]]+[[![]]+[][[]]][+[]][+!+[]+[+[]]]+[![]+[]][+[]][!+[]+!+[]]+[![]+[]][+[]][!+[]+!+[]]][[![]+{}][+[]][+!+[]+[+[]]]+[[]+{}][+[]][+!+[]]+[[][[]]+[]][+[]][+!+[]]+[![]+[]][+[]][!+[]+!+[]+!+[]]+[!![]+[]][+[]][+[]]+[!![]+[]][+[]][+!+[]]+[[][[]]+[]][+[]][+[]]+[![]+{}][+[]][+!+[]+[+[]]]+[!![]+[]][+[]][+[]]+[[]+{}][+[]][+!+[]]+[!![]+[]][+[]][+!+[]]]\`$${[![]+[]][+[]][+!+[]]+[![]+[]][+[]][!+[]+!+[]]+[!![]+[]][+[]][!+[]+!+[]+!+[]]+[!![]+[]][+[]][+!+[]]+[!![]+[]][+[]][+[]]+[[][[]]+[][[![]+[]][+[]][+[]]+[[![]]+[][[]]][+[]][+!+[]+[+[]]]+[![]+[]][+[]][!+[]+!+[]]+[![]+[]][+[]][!+[]+!+[]]]][+[]][!+[]+!+[]+[!+[]+!+[]]]+[+!+[]]+[[+[]]+![]+[][[![]+[]][+[]][+[]]+[[![]]+[][[]]][+[]][+!+[]+[+[]]]+[![]+[]][+[]][!+[]+!+[]]+[![]+[]][+[]][!+[]+!+[]]]][+[]][!+[]+!+[]+[+[]]]}$\`\`\`
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

    run        =>  []["fill"]["constructor"]\`$${ CODE }$\`\`\`
    eval       =>  []["fill"]["constructor"]\`$${"return eval($)"}$\`\`${ Code }\`
    
See the full list [here](https://github.com/centime/jsfsck/blob/master/jsfsck.js) and read the JSFuck [Wiki](https://github.com/aemkei/jsfuck/wiki) for a detailed explanation.  

### Links

* Demo [centime.org/jsfsck](http://centime.org/jsfsck)

* Parenthesis trick at [blog.portswigger.net](http://blog.portswigger.net/2016/07/executing-non-alphanumeric-javascript.html) (by [@garethheyes](https://twitter.com/garethheyes))

* Check out [JSFuck](http://jsfuck.com) (by [@aemkei](http://twitter.com/aemkei))

