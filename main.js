location.href = "https://jcuenod.github.io/hebrewTools"

const ht = require("hebrew-transliteration")
const transliterate = ht.transliterate


const $input = document.querySelector("#input")
const $output = document.querySelector("#output")

$input.addEventListener("keyup", e => {
	$output.textContent = transliterate(e.target.value)
	if (!$output.textContent) {
		$output.innerHTML = "<i>Transliteration</i>"
	}
})

