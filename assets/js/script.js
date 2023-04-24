// variavies DOM

const form = document.querySelector(".form");
const inputName = document.querySelector("#name");
const inputNumberCard = document.querySelector("#numberCard");
const inputMonth = document.querySelector("#data--month");
const inputYear = document.querySelector("#data--year");
const inputCvc = document.querySelector("#cvc");
const message = document.querySelectorAll(".message");
const buttonSubmit = document.querySelector("#button--submit");
const cardName = document.querySelector("#card__name");
const cardNumber = document.querySelector("#card__number");
const cardData = document.querySelector("#card__data");
const cardCvc = document.querySelector("#card__cvc");
const formCompleted = document.querySelector(".form--Completed");
const buttonBack = formCompleted.querySelector(".button_confirm");


// regex

const regexName = /^[a-zA-Z\W]{2,}(\s)?[a-zA-Z\W]+$/;
const regexNumberCard = /^[0-9]{4}(\s)[0-9]{4}(\s)[0-9]{4}(\s)[0-9]{4}$/;
const regexYear = /[0-9]{2}/;
const regexCvcCard = /[0-9]{3}/;
let mesesdoAno =[ "01" ,"02","03","04","05","06","07","08","09","10","11","12"];


form.addEventListener("submit", (event)=>{
	event.preventDefault();
})


function inputSucess(input,messagem,index){
	input.classList.add("sucess");
	input.classList.remove("error");
	message[index].style.opacity = 0;
	message[index].textContent = "Sucess";

}

function inputError(input,messagem,index){
	input.classList.add("error");
	input.classList.remove("sucess");
	message[index].style.opacity = 1;
	message[index].textContent = messagem;

}

function doValidationName(){
	const inputNameValue = inputName.value;
	if(inputNameValue.match(regexName)){
		inputSucess(inputName,"",0);
	}
	else if(inputNameValue === ""){
		inputError(inputName,"O campo não pode estar vazio!!!", 0);
	}
	else{
		inputError(inputName,"O nome é invalido!!!", 0);
	}
}


inputNumberCard.addEventListener("keydown" , doMaskInputNumberCard);

function doMaskInputNumberCard(){
	let inputNumberCardValue = inputNumberCard.value;
	if(inputNumberCardValue.length === 4 || inputNumberCardValue.length === 9 || inputNumberCardValue.length === 14){
		inputNumberCard.value += " ";
	}
}

function doValidationNumberCard(){
	let numberCardvalue = inputNumberCard.value;
	if(numberCardvalue.match(regexNumberCard)){
		inputSucess(inputNumberCard,"",1);
	}
	else if(inputNumberCard.value == ""){
		inputError(inputNumberCard,"O campo não pode estar vazio!!!", 1)
	}
	else{
		inputError(inputNumberCard,"O campo só pode ser usado numeros!!!", 1)
	}
}

function doValidationDate(){
	if(mesesdoAno.includes(inputMonth.value) && inputYear.value.match(regexYear)){
		inputSucess(inputYear,"", 2);
		inputSucess(inputMonth,"", 2);
	}
	else if(mesesdoAno.includes(inputMonth.value) && inputYear.value == ""){
		inputSucess(inputMonth,"", 2);
		inputError(inputYear,"O campo ano não pode estar vazio!", 2);
	}
	else if(inputMonth.value == "" && inputYear.value.match(regexYear)){
		inputSucess(inputYear,"", 2);
		inputError(inputMonth,"O campo mês não pode estar vazio!", 2);
	}

	else if(inputMonth.value == "" && inputYear.value == ""){
		inputError(inputMonth,"", 2);
		inputError(inputYear,"Os campos não podem estar vazios!", 2);
	}
	else if(!mesesdoAno.includes(inputMonth.value) || !inputYear.value.match(regexYear)){
		inputError(inputMonth,"", 2);
		inputError(inputYear,"Informe uma data válida!!!", 2);
	}
}

function doValidationNumberCvc(){
	let inputCvcValue = inputCvc.value;
	if(inputCvcValue.match(regexCvcCard)){
		inputSucess(inputCvc,"",3);
	}
	else if(inputCvcValue == ""){
		inputError(inputCvc,"O campo não pode estar vazio!!!",3);
	}
	else if(!inputCvcValue.match(regexCvcCard)){
		inputError(inputCvc,"O campo só pode ser usado numeros!",3);
	}
}

function doSendToCards(){
	if(inputName.classList.contains("sucess") && inputNumberCard.classList.contains("sucess") && inputMonth.classList.contains("sucess") && inputYear.classList.contains("sucess") && inputCvc.classList.contains("sucess") ){
		cardName.innerHTML = inputName.value;
		cardNumber.innerHTML = inputNumberCard.value;
		cardData.innerHTML = `${inputMonth.value} / ${inputYear.value}`;
		cardCvc.innerHTML = inputCvc.value;
		form.style.display = "none";
		formCompleted.style.display = "flex";
}
}

function doResetTheInputs(){
	inputName.value = "";
	inputNumberCard.value = "";
	inputMonth.value = "";
	inputYear.value = "";
	inputCvc.value = "";
}
function doCheckToInputs(){
	doValidationName();
	doValidationNumberCard();
	doValidationDate();
	doValidationNumberCvc();
	doSendToCards();

}

buttonSubmit.addEventListener("click" , doCheckToInputs);


function doBacktoForm(){
	form.style.display = "block";
	formCompleted.style.display = "none";
	doResetTheInputs();
}


buttonBack.addEventListener("click" , doBacktoForm);
