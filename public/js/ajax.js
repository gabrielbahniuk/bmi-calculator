(function() {
    'use strict';
    
    const URL = 'http://localhost:3000/data';
    const ajax = (function() {   

    return {
        get : function get(callback) {
            const ajax = new XMLHttpRequest();
            ajax.open('GET', URL);
            ajax.send();
            ajax.addEventListener('readystatechange', function(){
                if(this.readyState === 4 && this.status === 200)
                    callback(this.responseText);
            }, false);
        },
        post : function post(person, callback) {
            const ajax = new XMLHttpRequest();
            ajax.open('POST', URL);
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');            
            ajax.send('height='+person.height+'&weight='+person.weight+'&bmi='+person.bmi);
            ajax.addEventListener('readystatechange', function(){
                if(this.readyState === 4 && this.status === 200)
                    callback(this.responseText);
            }, false);
        }
    }    
})();

window.ajax = ajax;

})();