// Calculator JS
var calcArea = document.querySelector('.calcArea');
var form  = document.querySelector('.form');
var table = document.querySelector('.table');
var numberDatas = document.querySelectorAll('.number');
var signData = document.querySelectorAll('.sign');
var answer = document.querySelector('.common');
var allDatas = document.querySelectorAll('td');
// console.log(form.children);
// console.log(table.firstElementChild); // <tbody> </tbody>
var tds = table.firstElementChild.children;
// console.log((tds.length));

// console.log(allDatas[1].id);
//get focussed
allDatas.forEach(data=>{
    data.addEventListener('mousedown', e=>{
        e.target.classList.add('focused');
        e.target.style.background = 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)';
    });
    // data.addEventListener('mouseup', e=>{
    //     e.target.classList.remove('greenfocus');
    // });
    data.addEventListener('mouseleave', e=>{
        e.target.classList.remove('focused');
        e.target.style.background = 'linear-gradient(225deg,rgb(255, 255, 255),rgb(0, 0, 0, 0.5))';
    });
})

var getActive = ()=>{
    var inputs = form.children;   //HTML collection
    Array.from(inputs).forEach(input=>{      //array type can use .forEach method
        input.addEventListener('focus', e=>{
            getActive = e.target;
            getActive.classList.add('inputfocus');
            return getActive;
        });
        input.addEventListener('blur', e=>{
            getActive = e.target;
            getActive.classList.remove('inputfocus');
            // return getActive;
        });
    });
}
// var get = getActive();
getActive(); //to set events to all inputs and returned focussed input element

numberDatas.forEach(number=>{
        number.addEventListener('mousedown', e=>{
            if(getActive.name != 'operation' )
                getActive.value+= `${e.target.innerText}`;
        });
});

signData.forEach(sign =>{
    sign.addEventListener('mousedown', e=>{
            form.operation.value = `${e.target.innerText}`;
    });
});
// if sign is pressed it will automatically be wriiten inside operation box,
// because for sign pressing , active input field is only operation field , so no need to look for active field, hence straight to the operation field.

//operation implementation

//store the value of num1 num2 and sign
var n1,n2,s;
function store(){
    n1 = form.num1.value;
    n2 = form.num2.value;
    s = form.operation.value;
}
//num1 validation
function validNum1(){
    if(n1 === ""){
        return false;
    }
    return true;
}
//num2 validation
function validNum2(){
    if(n2 === "")
        return false;
    return true;
}
//operational sign validation
function validOp(){
    if(s != '+' && s != '-' && s != '*' && s != `/`)
        return false;
    return true;
}

function result(n1 , n2 , s){
    switch(s){
        case '+':
            return +n1 + +n2;//prepend + to make string to number
            break;
        case '-':
            return n1-n2;
            break;
        case '*':
            return n1*n2;
            break;
        default:
            if(n2!=0)
                return n1/n2;
            return "&#10060; division by zero";
    }
}
var equal = document.querySelector('#equal');

equal.addEventListener('click', ()=>{
    store();    //store all values before any operation
    answer.style.visibility = 'visible';
    table.style.top = '200px';
    calcArea.style.height = '460px';
    if(validNum1() && validNum2() && validOp()){
        // console.log(result(n1,n2,s));
        answer.innerHTML = result(n1,n2,s);
        answer.classList.remove('warning');
        answer.classList.add('result');
    } else {
        console.log("bad");
        console.log(validNum1(),validOp(),validNum2());
        answer.classList.remove('result');
        answer.classList.add('warning');
        if(validNum1()===false && validNum2() === false && validOp()===false){
            answer.innerHTML = '&#10060; all fields are empty!!!';
        } else if(validOp() === false){
            answer.innerHTML = '&#10060; invalid operation!!!';
        } else {
            answer.innerHTML = '&#10060; invalid number data!!!';
        } 
    }    
});

//resetting all values

var reset = document.querySelector('#reset');

reset.addEventListener('click', ()=>{
    form.num1.value = '';
    form.num2.value = '';
    form.operation.value = '';
    answer.innerHTML = '';
    answer.style.visibility = 'hidden';
    table.style.top = '150px';
    calcArea.style.height = '410px';
});