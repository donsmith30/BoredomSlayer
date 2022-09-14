let unsplashService = {
    endpoint: "https://api.unsplash.com/",
    accessKey: "&client_id=mj5PFE4ahehmfQbuAf6ct5mFI3UFKxGNpe_Wq9Yq8yQ"
}

unsplashService.getPic = (query) => {
    const config = {
        method: "GET",
        url: `${unsplashService.endpoint}search/photos?query=${query}${unsplashService.accessKey}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json", },
    };

    return axios(config);
};