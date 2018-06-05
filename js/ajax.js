(function() {
    'use strict';

    const URL = 'http://localhost:3000/data';
    var ajax = (function() {   

    return {
        get : function get() {
            const ajax = new XMLHttpRequest();
            ajax.open('GET', URL);
            ajax.send();
            ajax.addEventListener('readystatechange', function(){
                if(this.readyState === 4 && this.status === 200)
                    console.log(this.responseText);
            }, false);
        },
        post : function post(person) {
            const ajax = new XMLHttpRequest();
            ajax.open('POST', URL);
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');            
            ajax.send('height='+person.height+'&weight='+person.weight+'&imc='+person.imc);
            ajax.addEventListener('readystatechange', function(){
                if(this.readyState === 4 && this.status === 200)
                    console.log(this.responseText);
            }, false);
        }
    }    
})();

window.ajax = ajax;

})();