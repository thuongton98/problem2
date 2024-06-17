function fetchGET(url: string): Promise<any> {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(
                `Unable to Fetch Data, Please check 
                URL or Network connectivity!!`
            );
        }
        return response.json();
    })
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const getCurrency = async () => {
    const data = await fetchGET('https://interview.switcheo.com/prices.json')
    return data
  }
