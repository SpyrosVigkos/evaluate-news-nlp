function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //checkForName(formText)

    console.log("::: Form Submitted :::")
    
     /*api call*/
    fetch('http://localhost:8080/analyse', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ formText: formText }),
    });

    //Fetch data
    const sentiment = fetch("http://localhost:8080/all");
    const sentimentJson = sentiment.json();

    console.log(`Returning the ${sentiment}`);
    console.log(sentimentJson);

    
}

export { handleSubmit }
