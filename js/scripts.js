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
                $btnSave.setAttribute('disabled', 'disabled');
                $label.innerHTML = '--.--';
            },
            initEvents : function initEvents() {                
                $btnReset.addEventListener('click', this.resetForm, false);   
                $btnCalculate.addEventListener('click', this.handleGetBmi, false); 
                $btnSave.addEventListener('click', this.handleFormSubmit, false);                         
            },
            resetForm : function resetForm(e) {
                e.preventDefault();
                $btnSave.setAttribute('disabled', 'disabled');                                                                
                $form.reset();
            },            
            handleFormSubmit : function handleFormSubmit(e) {
                e.preventDefault(); 
                const obj = app.getObject();    
                console.log('Obj handle form -> ', obj);
                ajax.post(obj);
                alert('BMI successfully inserted!');
                this.reset();
            },
            getObject : function getObject() {
                const person = new Person(
                    $inputWeight.value,
                    $inputHeight.value,
                    app.calculateBMI($inputWeight.value, $inputHeight.value)                
                );                
                if (app.validateObject(person) === null)
                    return alert('Incorrect values. Please fill the gaps correctly!');
                $btnSave.removeAttribute('disabled');
                return person;
            },
            handleGetBmi : function handleGetBmi(e) {
                e.preventDefault();                        
                app.getObject();                        
                const valueBmi = app.getBMI();
                if (valueBmi !== null)                                    
                    $label.innerHTML = valueBmi;                                                                        
            },
            getBMI : function getBMI() {                
                return app.calculateBMI($inputWeight.value, $inputHeight.value);
            },
            validateObject : function validateObject(object) {
                try {   
                    if (
                    !this.isInputValid(object.weight, 'weight')
                    || !this.isInputValid(object.height, 'height')
                    )  
                        return null;                        
                    return object;                             
                } catch(e) {
                    throw new Error(e.message);
                }
            },
            calculateBMI : function calculateBMI(weight, height) {                                               
                if (
                    !this.isInputValid(weight, 'weight')
                 || !this.isInputValid(height, 'height')
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
            isInputValid : function isInputValid(value, expressionValue) {
                return this.getRegexOperations()[expressionValue].test(value);            
            }
        };        
}();
app.init();
})(document);