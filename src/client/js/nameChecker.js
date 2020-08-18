function showResults(result) {
    // selecting the result container from DOM
    const resultText = document.getElementById("results").innerHTML = 
    `<ul>
        <li>Agreement: ${result.agreement}</li>
        <li>Score_tag: ${result.score_tag}</li>
        <li>Confidence: ${result.confidence}%</li>
        <li>Irony: ${result.irony}</li>
        <li>Subjectivity: ${result.subjectivity}</li> 
    </ul>`;

  
}


function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}

export { checkForName,
    showResults }
