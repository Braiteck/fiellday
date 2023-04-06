// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Каталог
	$('.catalog .item .btn').click(function(e) {
		e.preventDefault()

		if($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.catalog_info').slideUp(300)
		} else {
			$('.catalog .item .btn').removeClass('active')
			$('.catalog_info').hide()

			$(this).addClass('active')
			$('.catalog_info.' + $(this).data('content')).slideDown(300)

			setTimeout(() => {
				document.getElementById($(this).data('content')).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			}, 50)
		}
	})


	// Плавная прокрутка к якорю
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}
})



window.addEventListener('load', function () {
	// Выравнивание элементов в сетке
	document.querySelectorAll('.catalog .row').forEach(el => {
		let styles = getComputedStyle(el)

		catalogHeight(el, parseInt(styles.getPropertyValue('--catalog_count')))
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


		// Выравнивание элементов в сетке
		document.querySelectorAll('.catalog .row').forEach(el => {
			let styles = getComputedStyle(el)

			catalogHeight(el, parseInt(styles.getPropertyValue('--catalog_count')))
		})


		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Выравнивание в каталоге
function catalogHeight(context, step) {
	let start = 0,
		finish = step,
		items = [...context.querySelectorAll('.item')],
		itemsName = context.querySelectorAll('.name'),
		itemsDesk = context.querySelectorAll('.desc'),
		i = 0

	itemsName.forEach(el => el.style.height = 'auto')
	itemsDesk.forEach(el => el.style.height = 'auto')

	items.forEach(el => {
		items.slice(start, finish).forEach(el => el.setAttribute('nodeList', i))

		setHeight(context.querySelectorAll('[nodeList="' + i + '"] .name'))
		setHeight(context.querySelectorAll('[nodeList="' + i + '"] .desc'))

		start = start + step
		finish = finish + step
		i++
	})
}