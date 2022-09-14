let tenorService = {
    apiKey: "AIzaSyBotRCXDt7y6Il_DEmiNMGJdeZUbOGQUTk",
    endpoint: "https://tenor.googleapis.com/v2/",
} 

function httpGetAsync(theUrl, callback, text)
{
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText, text);
        }
    }

    xmlHttp.open("GET", theUrl, true);

    xmlHttp.send(null);

    return;
}

function tenorCallback_search(responsetext, text)
{
    let response_objects = JSON.parse(responsetext);

    top_10_gifs = response_objects["results"];

    let randomNum = Math.floor(Math.random() * top_10_gifs.length);

    const modalDiv = $('#template2');
    let newPic = top_10_gifs[randomNum]["media_formats"]["tinygif"]["url"];
    modalDiv.find('img').attr('src', newPic);
    modalDiv.find('#modalSpan2').text(text);
    modalDiv.modal('show');

    return;
}

tenorService.grabData = (query, text) => {
    
    var search_url = `${tenorService.endpoint}search?q=${query}&key=${tenorService.apiKey}&client_key=my_test_app&limit=10`;

    httpGetAsync(search_url,tenorCallback_search, text);

    return;
}