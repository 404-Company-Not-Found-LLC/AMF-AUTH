document.getElementById('myButton').addEventListener('click', function () {
	var inputValue = document.getElementById('myInput').value;
	browser.storage.local.set({ key: inputValue });
});
