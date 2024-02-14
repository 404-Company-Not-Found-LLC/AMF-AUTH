document.getElementById('myButton').addEventListener('click', function () {
	var inputValue = document.getElementById('myInput').value;
	// Ensure you're using the browser API correctly. For Chrome, it should be chrome.storage.local.
	browser.storage.local.set({ key: inputValue });
	displayStoredValue();
});

// Function to retrieve and display the stored value
function displayStoredValue() {
	// Again, ensure correct API usage. For Chrome, it should be chrome.storage.local.
	browser.storage.local.get('key', function (result) {
		// Check if the key exists
		if (result.key !== undefined) {
			document.getElementById('displayKeyValue').textContent = result.key;
		} else {
			document.getElementById('displayKeyValue').textContent =
				'No value stored';
		}
	});
}

// Call the function when the popup is opened
document.addEventListener('DOMContentLoaded', displayStoredValue);
