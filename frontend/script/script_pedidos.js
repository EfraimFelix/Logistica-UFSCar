// tabs.js
document.addEventListener("DOMContentLoaded", function () {
	const tabs = document.querySelectorAll(".tab")
	const contents = document.querySelectorAll(".tab-content")
	const indicator = document.querySelector(".tab-indicator")

	tabs.forEach((tab, index) => {
		tab.addEventListener("click", function () {
			tabs.forEach((t) => t.classList.remove("active"))
			tab.classList.add("active")

			contents.forEach((c) => c.classList.add("hidden"))
			document.getElementById(tab.dataset.tab).classList.remove("hidden")

			indicator.style.transform = `translateX(${index * 95}px)`
		})
	})
})

function changeTab() {
	const tabPed = document.getElementById("tab-pedido")
	const tabRas = document.getElementById("tab-rastreio")
	
	if (tabPed.classList.contains("active")){
		tabPed.classList.remove("active")
		tabPed.classList.add("active")
	}
	else{
		tabRas.classList.remove("active")
		tabPed.classList.add("active")
	}
}
