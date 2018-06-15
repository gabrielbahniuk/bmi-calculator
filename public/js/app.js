(function(doc) {

    'use strict';
    
    const app = function() {
        const ajax = window.ajax;
        return {
            init : function init() { 
                this.initVars();
                this.defaultValues();           
                this.initEvents();                
            },
            initVars : function initVars() {                               
                const $inputWeight = doc.querySelector('[data-js="input-weight"]');
                const $inputHeight = doc.querySelector('[data-js="input-height"]');                 
                const $form = doc.querySelector('[data-js="form"]');
                const $btnCalculate = doc.querySelector('[data-js="btn-calculate"]');
                const $btnReset = doc.querySelector('[data-js="btn-reset"]');                                             
                const $btnSave = doc.querySelector('[data-js="btn-save"]');                
                const $label = doc.querySelector('[data-js="label-imc"]');                
                window.$inputHeight = $inputHeight;
                window.$inputWeight = $inputWeight;
                window.$form = $form;
                window.$btnCalculate = $btnCalculate;
                window.$btnReset = $btnReset;
                window.$btnSave = $btnSave;
                window.$label = $label;  
            },
            defaultValues : function defaultValues() {
                $form.reset();
                $btnSave.setAttribute('disabled', 'disabled');
                $label.innerHTML = 'Your BMI is --.--';                
            },
            initEvents : function initEvents() {                
                $btnReset.addEventListener('click', this.resetForm, false);   
                $btnCalculate.addEventListener('click', this.handleClickCalculate, false);                 
                $form.addEventListener('submit', this.handleFormSubmit, false);
            },
            resetForm : function resetForm(e) {
                e.preventDefault();
                app.defaultValues();
            },            
            handleFormSubmit : function handleFormSubmit(e) {
                e.preventDefault(); 
                const obj = app.getObject();
                if (!obj)                    
                    return alert('Some value is invalid.');
                ajax.post(obj);
                alert('BMI successfully inserted!');                
                app.resetForm(e);
            },
            getObject : function getObject() { 
                const person = new Person(
                    $inputWeight.value,
                    $inputHeight.value,
                    app.calculateBMI($inputWeight.value, $inputHeight.value)
                );                
                if (!app.validateObject(person))
                    return null;
                $btnSave.removeAttribute('disabled');
                return person;
            },
            handleClickCalculate : function handleClickCalculate(e) {
                e.preventDefault();
                const person = app.getObject();
                if (!person)
                    return alert('Invalid values. Please try again.');                                                                           
                const valueBmi = app.getBMI(person);
                if (valueBmi) {                                   
                    $label.innerHTML = 'Your BMI is ' + valueBmi;                                                                        
                    $btnSave.removeAttribute('disabled');
                }
            },
            getBMI : function getBMI(person) {                                
                if (person)
                    return person.imc;
            },
            validateObject : function validateObject(object) {
                try {   
                    if (
                       !this.hasInputMatchedRegex(object.weight, 'weight')
                    || !this.hasInputMatchedRegex(object.height, 'height')
                    )  
                        return null;                        
                    return object;                             
                } catch(e) {
                    throw new Error(e.message);
                }
            },
            calculateBMI : function calculateBMI(height, weight) {                
                if (
                   !this.hasInputMatchedRegex(weight, 'weight')
                || !this.hasInputMatchedRegex(height, 'height')
                   )
                    return null;                                              
                height /= 100;                   
                return (weight / (height * height)).toFixed(2);
            },
            getRegexOperations : function getRegexOperations() {
                return {
                    weight: /^\d{2,3}$/gm,
                    height: /^\d{2,3}$/gm                
                };
            },
            hasInputMatchedRegex : function hasInputMatchedRegex(value, expressionValue) {
                return this.getRegexOperations()[expressionValue].test(value);            
            }
        };        
}();

app.init();

})(document);