(function(w, d){
	let b = d.getElementsByTagName('body')[0],
	e = d.documentElement,
	wWidth = w.innerWidth || e.clientWidth || b.clientWidth,
	wHeight = w.innerHeight || e.clientHeight|| b.clientHeight;

	let dropDownMenu = document.querySelectorAll('.menu-item-has-children');
	for(let i=0; i < dropDownMenu.length; i++){
		dropDownMenu[i].onclick = function(){
		 	let submenu = dropDownMenu[i].querySelector('.sub-menu');
			if (submenu.classList.contains('submenushow')) {
				submenu.style.visibility = 'hidden';
				submenu.style.opacity = '0';
				submenu.style.height = '0px';
				submenu.classList.remove('submenushow');
			}else{
				submenu.style.visibility = 'visible';
				submenu.style.opacity = '1';
				submenu.style.height = 'auto';
				submenu.classList.add('submenushow');
			}
		}
	}

	let font = d.createElement('link');
	font.async = true;
	font.type = 'text/css';
	font.rel = 'stylesheet';
	font.href = 'https://fonts.googleapis.com/css?family=Quicksand:400,700';

	b.appendChild(font);

	let lazyload = d.createElement('script'),
	lazyloadVersion = !('IntersectionObserver' in w) ? '8.17.0' : '10.19.0';
	lazyload.async = true;
	lazyload.src = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@' + lazyloadVersion + '/dist/lazyload.min.js';
	w.lazyLoadOptions = {elements_selector: '.lazy'};

	b.appendChild(lazyload);

	let slider = d.createElement('script');
	slider.async = true;
	slider.src = 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.1/min/tiny-slider.js';
	b.appendChild(slider);

	slider.onload = function(){
		let slider = d.querySelector('.slider');
		if( typeof(slider) != 'undefined' && slider != null ){
			let sl = tns({
				container: '.slider',
				items: 1,
				slideBy: 'page',
				autoplay: true,
				speed: 300,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 2500,
				swipeAngle: false,
				controls: false,
				arrowKeys: false,
				autoplayButton: false,
				autoplayText: ['▶','stop'],
				lazyload: '.tns-lazy-img',
			});
		}
	}
	/*
	zoomed photo on mouse hover
	 */
	let bigphoto = document.getElementById('bigphoto');
	if( typeof(bigphoto) != 'undefined' && bigphoto != null ){
		let zoomedImage = bigphoto.parentNode;

		zoomedImage.addEventListener('mouseenter', function(e) {
			this.style.backgroundImage = 'url('+ bigphoto.src +')';
			this.style.backgroundSize = "200%";
			bigphoto.style.opacity = 0;
		}, false);

		zoomedImage.addEventListener('mousemove', function(e) {
			// getBoundingClientReact gives us various information about the position of the element.
			var dimentions = this.getBoundingClientRect();

			// Calculate the position of the cursor inside the element (in pixels).
			var x = e.clientX - dimentions.left;
			var y = e.clientY - dimentions.top;

			// Calculate the position of the cursor as a percentage of the total size of the element.
			var xpercent = Math.round(100 / (dimentions.width / x));
			var ypercent = Math.round(100 / (dimentions.height / y));

			// Update the background position of the image.
			this.style.backgroundPosition = xpercent+'% ' + ypercent+'%';

		}, false);

		zoomedImage.addEventListener('mouseleave', function(e) {
			this.style.backgroundSize = "cover";
			this.style.backgroundPosition = "center";
			this.style.backgroundImage = '';
			this.style.backgroundSize = '100%';
			bigphoto.style.opacity = 1;
		}, false);
	}

	let productboxs = d.querySelectorAll('.productbox');
	for(let i=0; i < productboxs.length; i++){
		let height = productboxs[i].offsetWidth;
		let thumb = productboxs[i].querySelector('.thumb');
		thumb.style.height = height+'px';
	}

	let photoboxs = d.querySelectorAll('.photo');
	for(let i=0; i < photoboxs.length; i++){
		let height = photoboxs[i].offsetWidth;
		let img = photoboxs[i].querySelector('.photobig');
		img.style.height = height+'px';
	}

}(window, document));

const currency = new Intl.NumberFormat('id-ID', {
	style: 'currency',
	currency: 'IDR',
	minimumFractionDigits: 0
})

function photoChanger(ini){
	let parent = ini.parentNode.parentNode,
	photo = parent.querySelector('img#bigphoto'),
	changer = ini.getAttribute('data-image-full');

	photo.src = changer;
	return;
}

function productsFilter(ini){
	window.location.replace(ini.value);
}

function productOptionSize(ini){
	document.querySelector('[name="order_item_size"]').value = ini.value;
}

function productOptionColor(ini){
	document.querySelector('[name="order_item_color"]').value = ini.value;
}

function productOptionCustom(ini, customPrice){
	document.querySelector('[name="order_item_custom"]').value = ini.value;
	if( customPrice !== 0 ){
		document.querySelector('[name="order_item_price"]').value = parseInt(customPrice);
		document.querySelector('#price-view').innerHTML = currency.format(customPrice);
	}
}

function productOptionQty(ini,plusminus){
	let inputQty = ini.parentNode.querySelector('input[type=number]'),
	oldInputQtyValue = inputQty.value,
	newInputQtyValue = 1;
	if( plusminus == 'minus' ){
		if( oldInputQtyValue <= 1 ){
			newInputQtyValue = 1;
		}else{
			newInputQtyValue  = parseInt(oldInputQtyValue) - 1;
		}
	}else{
		newInputQtyValue  = parseInt(oldInputQtyValue) + 1;
	}

	inputQty.value = newInputQtyValue;
}

function formProductOptionQty(ini,plusminus){
	let inputQty = ini.parentNode.querySelector('input[type=number]'),
	oldInputQtyValue = inputQty.value,
	newInputQtyValue = 1,
	form = document.getElementById('orderViaWa'),
	price = form.querySelector('[name="order_item_price"]').value;

	if( plusminus == 'minus' ){
		if( oldInputQtyValue <= 1 ){
			newInputQtyValue = 1;
		}else{
			newInputQtyValue  = parseInt(oldInputQtyValue) - 1;
		}
	}else{
		newInputQtyValue  = parseInt(oldInputQtyValue) + 1;
	}

	inputQty.value = newInputQtyValue;

	let subtotal = parseInt(price) * parseInt(newInputQtyValue);

	form.querySelector('#orderSubTotal').innerHTML = currency.format(subtotal);
	form.querySelector('[name="order_sub_total"]').value = subtotal;
	form.querySelector('#orderTotal').innerHTML = currency.format(subtotal);
	form.querySelector('[name="order_total"]').value = subtotal;
}

function openOrderWA(ini){
	let formData = ini.elements,
	inputs = {},
	form = document.getElementById('orderViaWa'),
	variableLabel = '',
	variableValue = '';

	for (let i = 0; i < formData.length; i++) {
		let key = formData[i].name;
		let type = formData[i].type;
		if( key !== '' && type !== 'radio' ){
			inputs[key] = formData[i].value;
			let input = form.querySelector('[name="'+key+'"]');
			if(typeof input !== 'undefined' && input !== null ){
				input.value = formData[i].value;
			}
		}
	}

	form.querySelector('#orderItemPhoto').src = inputs.order_item_photo;
	form.querySelector('#orderItemTitle').innerHTML = inputs.order_item_name;
	form.querySelector('#orderItemPrice').innerHTML = currency.format(inputs.order_item_price);

	if( 'order_form_lp' in inputs ){
		form.querySelector('.item').style.display = 'none';
		//form.querySelector('.qtyqty').style.display = 'block';
	}else{
		form.querySelector('.item').style.display = 'block';
		//form.querySelector('.qtyqty').style.display = 'none';
	}

	if( 'order_item_qty' in inputs ){
		inputs.order_item_qty = inputs.order_item_qty;
	}else{
		inputs.order_item_qty = 1;
	}

	variableLabel += '<td>Qty</td>';
	variableValue += '<td>'+inputs.order_item_qty+'</td>';

	if( 'order_item_color' in inputs ){
		variableLabel += '<td>Warna</td>';
		variableValue += '<td>'+inputs.order_item_color+'</td>';
	}

	if( 'order_item_size' in inputs ){
		variableLabel += '<td>Ukuran</td>';
		variableValue += '<td>'+inputs.order_item_size+'</td>';
	}

	if( 'order_item_custom' in inputs && 'order_item_custom_label' in inputs ){
		variableLabel += '<td>'+inputs.order_item_custom_label+'</td>';
		variableValue += '<td>'+inputs.order_item_custom+'</td>';
	}

	form.querySelector('#orderItemVariableLabel').innerHTML = variableLabel;
	form.querySelector('#orderItemVariableValue').innerHTML = variableValue;

	let subtotal = parseInt(inputs.order_item_price) * parseInt(inputs.order_item_qty);

	form.querySelector('#orderSubTotal').innerHTML = currency.format(subtotal);
	form.querySelector('[name="order_sub_total"]').value = subtotal;
	form.querySelector('#orderTotal').innerHTML = currency.format(subtotal);
	form.querySelector('[name="order_total"]').value = subtotal;

	form.classList.add('open');
}

function closeOrderWA(){
	window.location.reload();
	// let form = document.getElementById('orderViaWa'),
	// ongkirField = form.querySelector('#orderOngkir');
	// subdistrictField = form.querySelector('#getSubDistrict'),
	// form.classList.remove('open');
	//
	// ongkirField.options.length = 0;
	// ongkirField.options.add(new Option('Pilih Ongkir', ''));
	//
	// subdistrictField.options.length = 0;
	// subdistrictField.options.add(new Option('Pilih Ongkir', ''));
}

function chooseOngkir(ini){
	let form = document.getElementById('orderViaWa'),
	weight = form.querySelector('[name="order_item_weight"]').value,
	ongkir = ini.value,
	orderSubTotal = form.querySelector('[name="order_sub_total"]').value,
	orderTotal = form.querySelector('[name="order_total"]'),
	orderTotalView = form.querySelector('#orderTotal');
	orderCourier = form.querySelector('[name="order_courier"]');

	let total = parseInt(orderSubTotal) + parseInt(ongkir);
	orderTotal.value = total;
	orderTotalView.innerHTML = curr.format(total);
	orderCourier.value = ini.options[ini.selectedIndex].text;
}

function orderWA(ini){
	let formData = ini.elements,
	inputs = {},
	wa = 'https://web.whatsapp.com/send',
	orderDetail = '',
	ajax_url = ini.getAttribute('action'),
	ajax = new XMLHttpRequest();

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        wa = 'whatsapp://send';
	}

	for (let i = 0; i < formData.length; i++) {
		let key = formData[i].name;
		if( key !== '' ){
			inputs[key] = formData[i].value;
		}
	}

	orderDetail += 'Quantity : *' + inputs.order_item_qty + '* pcs%0A';

	let subdistrict = '';

	if(typeof inputs.order_item_size !== 'undefined' && inputs.order_item_size !== '' ){
		orderDetail += 'Ukuran : *' + inputs.order_item_size + '*%0A';
	}
	if(typeof inputs.order_item_color !== 'undefined' && inputs.order_item_color !== '' ){
		orderDetail += 'Warna : *' + inputs.order_item_color + '*%0A';
	}
	if(typeof inputs.order_item_custom !== 'undefined' && inputs.order_item_custom !== '' ){
		orderDetail += inputs.order_item_custom_label+' : *' + inputs.order_item_custom + '*%0A';
	}

	if(typeof inputs.order_courier !== 'undefined' && inputs.order_courier !== '' ){
		orderDetail += '%0ASub Total : *' + currency.format(inputs.order_sub_total) + '*%0A';
		orderDetail += 'Ongkir : *' + inputs.order_courier+ '*%0A';
		orderDetail += 'Total : *' + currency.format(inputs.order_total) + '*%0A';
		subdistrict = '%0A' + inputs.subdistrict;
	}else{
		orderDetail += '%0ASub Total : *' + currency.format(inputs.order_total) + '* ( _belum termasuk ongkir_ )%0A';
	}

	let url = wa + '?phone=' + inputs.admin_phone + '&text=' + inputs.gretings + '.%0A' + '*' + inputs.order_item_name + '* %0A' + orderDetail + '--------------------------------%0A*Nama :*%0A' + inputs.full_name + ' (' + inputs.phone + ') %0A%0A*Alamat :*%0A' + inputs.address + subdistrict + '%0A--------------------------------%0AVia ' + location.href;

	ajax.open('POST', ajax_url);
	ajax.setRequestHeader('Content-Type', 'application/json');
	ajax.setRequestHeader('nonce', inputs.nonce);
	ajax.onload = function() {
		if (ajax.status === 200) {
			//
			//console.log(ajax.responseText);
		}
	};

	ajax.send(JSON.stringify(inputs));


	console.log(url);


	let w = 960,h = 540,left = Number((screen.width / 2) - (w / 2)),top = Number((screen.height / 2) - (h / 2)),popupWindow = window.open(url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	popupWindow.focus();

	return false;
}

function openHelpWA(tujuan = false){
	let form = document.getElementById('helpViaWa');
	if( tujuan ){
		form.querySelector('[name=destination]').value = tujuan;
	}
	form.classList.add('open');
}

function closeHelpWA(){
	let form = document.getElementById('helpViaWa');
	form.classList.remove('open');
}

function helpWA(ini){
	let formData = ini.elements,
	inputs = {},
	wa = 'https://web.whatsapp.com/send',
	ajax = new XMLHttpRequest();

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        wa = 'whatsapp://send';
	}

	for (let i = 0; i < formData.length; i++) {
		let key = formData[i].name;
		if( key !== '' ){
			inputs[key] = formData[i].value;
		}
	}

	console.log(inputs);

	let message = inputs.message.replace(/\n/g, '%0A');

	let url = wa + '?phone=' + inputs.destination + '&text=' + inputs.gretings + '.%0A' + 'Saya *' + inputs.full_name + '*.%0ANomor Hp : *' + inputs.phone + '*%0A%0A ' + '💬 ' + message + '%0A%0A ' + 'Via ' + location.href;


	let w = 960,h = 540,left = Number((screen.width / 2) - (w / 2)),top = Number((screen.height / 2) - (h / 2)),popupWindow = window.open(url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	popupWindow.focus();

	return false;
}

window.addComment=function(a){function b(){c(),g()}function c(a){if(t&&(m=j(r.cancelReplyId),n=j(r.commentFormId),m)){m.addEventListener("touchstart",e),m.addEventListener("click",e);for(var b,c=d(a),g=0,h=c.length;g<h;g++)b=c[g],b.addEventListener("touchstart",f),b.addEventListener("click",f)}}function d(a){var b,c=r.commentReplyClass;return a&&a.childNodes||(a=q),b=q.getElementsByClassName?a.getElementsByClassName(c):a.querySelectorAll("."+c)}function e(a){var b=this,c=r.temporaryFormId,d=j(c);d&&o&&(j(r.parentIdFieldId).value="0",d.parentNode.replaceChild(o,d),b.style.display="none",a.preventDefault())}function f(b){var c,d=this,e=i(d,"belowelement"),f=i(d,"commentid"),g=i(d,"respondelement"),h=i(d,"postid");e&&f&&g&&h&&(c=a.addComment.moveForm(e,f,g,h),!1===c&&b.preventDefault())}function g(){if(s){var a={childList:!0,subTree:!0};p=new s(h),p.observe(q.body,a)}}function h(a){for(var b=a.length;b--;)if(a[b].addedNodes.length)return void c()}function i(a,b){return u?a.dataset[b]:a.getAttribute("data-"+b)}function j(a){return q.getElementById(a)}function k(b,c,d,e){var f=j(b);o=j(d);var g,h,i,k=j(r.parentIdFieldId),p=j(r.postIdFieldId);if(f&&o&&k){l(o),e&&p&&(p.value=e),k.value=c,m.style.display="",f.parentNode.insertBefore(o,f.nextSibling),m.onclick=function(){return!1};try{for(var s=0;s<n.elements.length;s++)if(g=n.elements[s],h=!1,"getComputedStyle"in a?i=a.getComputedStyle(g):q.documentElement.currentStyle&&(i=g.currentStyle),(g.offsetWidth<=0&&g.offsetHeight<=0||"hidden"===i.visibility)&&(h=!0),"hidden"!==g.type&&!g.disabled&&!h){g.focus();break}}catch(t){}return!1}}function l(a){var b=r.temporaryFormId,c=j(b);c||(c=q.createElement("div"),c.id=b,c.style.display="none",a.parentNode.insertBefore(c,a))}var m,n,o,p,q=a.document,r={commentReplyClass:"comment-reply-link",cancelReplyId:"cancel-comment-reply-link",commentFormId:"commentform",temporaryFormId:"wp-temp-form-div",parentIdFieldId:"comment_parent",postIdFieldId:"comment_post_ID"},s=a.MutationObserver||a.WebKitMutationObserver||a.MozMutationObserver,t="querySelector"in q&&"addEventListener"in a,u=!!q.documentElement.dataset;return t&&"loading"!==q.readyState?b():t&&a.addEventListener("DOMContentLoaded",b,!1),{init:c,moveForm:k}}(window);
