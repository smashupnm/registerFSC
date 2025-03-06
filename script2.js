function submitForm(event) {
    event.preventDefault();  // Prevent the form from being submitted the default way

    const formData = new FormData(document.getElementById('uploadForm'));
    const fileInput = document.getElementById('fileInput');  // Assuming the input field has the id 'fileInput'
    const file = fileInput.files[0];  // Get the uploaded file

    // Show loading banner
    const loadingBanner = document.getElementById("loadingBanner");
    loadingBanner.style.display = "block";

    fetch("https://script.google.com/macros/s/AKfycbxeMYYjuCjwkPKnO1s1wyPfzeKOwKZWByPow5zP440kfzz1eAlz5Uw81yachoaka2kefQ/exec", {
        method: "POST",
        body: formData  // Send formData directly as body
    })
    .then(response => response.text())
    .then(data => {
        if (data === "Success") {
            // Hide the loading banner
            loadingBanner.style.display = "none";

            // Display success message in the banner
            const banner = document.getElementById("messageBanner");
            const responseMessage = document.getElementById("responseMessage");

            // Show the message in the banner
            banner.style.display = "block";
            responseMessage.style.display = "block"; // Make sure it's visible

            // Optionally, hide the message after a few seconds
            setTimeout(() => {
                banner.style.display = "none";
		responseMessage.style.display = "none";
            }, 5000);  // Message will disappear after 5 seconds

            // Hide the form and reset it
            document.getElementById("uploadForm").reset();

            // Now send the uploaded file to Telegram
            sendFileToTelegram(file);
        } else {
            alert("Failed to submit. Please try again.");
            loadingBanner.style.display = "none";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was an error submitting your form. Please try again.");
        loadingBanner.style.display = "none";
    });
}

function sendFileToTelegram(file) {
    const telegramBotToken = "7628239798:AAH2q8OVeFOOTVsZAe3UERMnCtYzDvZPXF0";  // Replace with your bot's token
    const chatId = "-4726022922";  // Replace with the chat ID to send the file to

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("document", file);

    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendDocument`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log("File sent to Telegram successfully!");
        } else {
            console.error("Failed to send file to Telegram:", data);
        }
    })
    .catch(error => {
        console.error("Error sending file to Telegram:", error);
    });
}
