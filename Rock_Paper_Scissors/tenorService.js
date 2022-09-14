let tenorService = {
    apiKey: "AIzaSyBotRCXDt7y6Il_DEmiNMGJdeZUbOGQUTk",
    endpoint: "https://tenor.googleapis.com/v2/",
} 

function httpGetAsync(theUrl, callback, text)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText, text);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext, text)
{
    // Parse the JSON response
    var response_objects = JSON.parse(responsetext);

    top_10_gifs = response_objects["results"];

    const modalDiv = $('#template');
    let newPic = top_10_gifs[0]["media_formats"]["nanogif"]["url"];
    modalDiv.find('img').attr('src', newPic);
    modalDiv.find('#modalSpan').text(text);
    modalDiv.modal('show');

    // console.log(top_10_gifs);

    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (gif)

    // document.getElementById("preview_gif").src = top_10_gifs[0]["media_formats"]["nanogif"]["url"];

    // document.getElementById("share_gif").src = top_10_gifs[0]["media_formats"]["gif"]["url"];

    return;
}


// function to call the trending and category endpoints
//function grab_data(query)
tenorService.grabData = (query, text) => {
    // var apikey = "API_KEY";
    // var clientkey = "my_test_app";
    // var lmt = 8;

    // test search term
    // var search_term = "excited";

    // using default locale of en_US
    var search_url = `${tenorService.endpoint}search?q=${query}&key=${tenorService.apiKey}&client_key=my_test_app&limit=10`;
    // "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
    //         apikey +"&client_key=" + clientkey +  "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_search, text);

    // data will be loaded by each call's callback
    return;
}


// SUPPORT FUNCTIONS ABOVE
// MAIN BELOW

// start the flow
// grab_data();