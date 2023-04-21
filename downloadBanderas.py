import requests
import json

with open('linksPaisesImagenesScrapeadas.json') as f:
    links = json.load(f)

for i in links:
    url = i['link']

    response = requests.get(url)

    # Check if the response was successful
    if response.status_code == 200:
        # Open a file for binary writing
        with open(f"countryImages/{i['nombre']}.png", 'wb') as f:
            # Write the response content to the file
            f.write(response.content)
    else:
        print('Failed to download image for ', i['nombre'])

print('Done!')