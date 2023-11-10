const inputElement = document.getElementById("input");
const processButton = document.getElementById("processButton");
const outputElement1 = document.getElementById("output1");
const outputElement2 = document.getElementById("output2");
const editButton = document.getElementById("editButton");
const editInput = document.getElementById("editInput");


// Add a click event listener to the edit button
editButton.addEventListener("click", () => {
    // Handle the edit action here
    // For example, you can open a text editor for editing the highlighted text
    alert("Edit button clicked!");
});


// Detect text selection within the output divs
outputElement1.addEventListener("mouseup", checkSelection);
outputElement2.addEventListener("mouseup", checkSelection);

// Function to check text selection
function checkSelection() {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    if (selectedText !== "") {
        // Text is highlighted, show the edit button
        editButton.style.display = "block";
    } else {
        // No text is highlighted, hide the edit button
        editButton.style.display = "none";
    }
}

function typeTwoTexts(text1, text2, index1, index2) {
    if (index1 < text1.length || index2 < text2.length) {
        if (index1 < text1.length) {
            outputElement1.textContent += text1.charAt(index1);
            index1++;
        }
        if (index2 < text2.length) {
            outputElement2.textContent += text2.charAt(index2);
            index2++;
        }

        setTimeout(() => {
            typeTwoTexts(text1, text2, index1, index2);
        }, 50); // Adjust the delay as needed
    }
}



processButton.addEventListener("click", () => {
    const inputText = inputElement.value;

    // Clear the previous content in the output element
    outputElement.textContent = "";

    // Helper function to type the text one character at a time
    
    // Call the typing function with the processed text
    fetch("/process-text", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText }),
    })
    .then(response => response.json())
    .then(data => {
        // Start typing the processed response
        typeText("Processed: " + data.outputText, 0);
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

// Audio file section 
const audioFileInput = document.getElementById("audioFile");
const uploadButton = document.getElementById("uploadButton");

uploadButton.addEventListener("click", () => {
    const selectedFile = audioFileInput.files[0];
    if (selectedFile) {
        // You can access the selected audio file as 'selectedFile'
        // Perform any necessary processing or send it to the server.
        console.log("Selected audio file:", selectedFile);

        // You can use the 'FormData' object to send the file to the server via a 'fetch' request.
        const formData = new FormData();
        formData.append("audioFile", selectedFile);

        // Send the file to the server using 'fetch' or any other method.
        fetch("/process-audio", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Processed audio response from the server
            console.log("Processed audio response:", data);
            typeTwoTexts("Original Transcript: " + data.output_original_transcript, "Translated Transcript: " + data.output_translated_transcript, 0, 0);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    } else {
        console.warn("No file selected.");
    }
});
