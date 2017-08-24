console.log('page8__circle.js starts!');

/* jq | Настройки круговой диаграммы knob.js */
$(function() {
	$(".dial").knob({
	    'min':0, //минимальное значение
	    'max':100, //максимальное значение
	    'angleArc': 360, //размер дуги в градусах
	    'angleOffset':1, //поворот диаграммы в градусах
    	'width': 174, //ширина
    	'height': 174, //высота
    	'fgColor': '#e93b90', //цвет заполняющий шкалы
    	'bgColor': '#efefef', //цвет фона пустой части диаграммы
    	'thickness': 0.07, //толщина
    	'fontWeight': false, //жирность шрифта
    	'readOnly': true //отключить онлайн взаимодействие с диаграммой
	});
});

/* js | Скрипт добавления и удаления классов */
(function() {
	var dial = document.querySelectorAll('.dial'); //получить все элементы классв .dial
	var dialArr = Array.prototype.slice.call(dial); //переводим их в массив
	dialArr.forEach(function(index, array, currentValue) { //перебор массива
		var val = index.getAttribute('value'); //получаем значение атрибута
		if (val >= 100) { 
			var parent = index.parentNode; //определяем родителя
			parent.classList.add('page8__item-circle_hundred'); //добавляем родителю класс
			index.classList.add('dial_marging'); //добавляем текщ элементу класс
		} else if (val < 100) {
			var parent = index.parentNode;
			parent.classList.remove('page8__item-circle_hundred'); //удаляем у родителя класс
			index.classList.remove('dial_marging'); //удаляем у текщ элемента класс
		} else { return; }
	});
})();