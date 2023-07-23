import asyncio
from flask import Flask, request, jsonify
import aiohttp

app = Flask(__name__)

#function to fetch data from indivisual url 
async def fetch(url, session):
    try:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.json()
            else:
                return None
    except aiohttp.ClientError:
        return None

#function to get multiple HTTP GET request
async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(url, session) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        return [result for result in results if not isinstance(result, Exception)]

#this route is called when /numbers is hit in the request
@app.route('/numbers')
def get_numbers():
    #segragating URLS which are present in the request with respect to "url" keyword
    urls = request.args.getlist('url')
    #if no url is provided it will written no urls provided in the response
    if not urls:
        return jsonify({'error': 'No URLs provided.'}), 400
    #used of managing asynchronous operations
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    try:
        #getting response from the url's present in the request
        responses = loop.run_until_complete(fetch_all(urls))
    except asyncio.TimeoutError:
        return jsonify({'error': 'Request timeout.'}), 500
    #declaring a set so that the elements are unique
    unique_numbers = set()
    #looping throigh the responses of all the url's one by one
    for response in responses:
        if response and isinstance(response, dict):
            #getting the value associated with the number as key
            numbers = response.get('numbers')
            #if number is not empty it will add it to unique_number
            if numbers:
                unique_numbers.update(numbers)
    #returning the numbers in response in sorted order
    return jsonify({'numbers': sorted(list(unique_numbers))})

if __name__ == '__main__':
    #running the app on port 8008
    app.run(host='0.0.0.0', port=8008)
