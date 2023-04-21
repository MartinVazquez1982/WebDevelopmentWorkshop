import requests
import json
from bs4 import BeautifulSoup

def get_all_countrys():

    url = 'https://www.mundoprimaria.com/recursos-ciencias-sociales/banderas-mundo'
    response = requests.get(url)
    html_doc = response.content

    soup = BeautifulSoup(html_doc, 'html.parser')

    link_images = soup.find_all('img')
    links = []
    for i in link_images:
        links.append(i['src'])

    final_links=[]
    for i in links[15:65]: # europa
        final_links.append(i)
    for i in links[67:123]: #africa
        final_links.append(i)
    for i in links[125:169]: #asia
        final_links.append(i)
    for i in links[171:207]: #america
        final_links.append(i)
    for i in links[209:223]: #oceania
        final_links.append(i)

    return final_links

linksPaises = get_all_countrys()

with open('linksPaisesImagenesScrapeadas.json') as f:
    json_links = json.load(f)

for link in linksPaises:
    json_links.append({
        'nombre': link.split('/')[-1].split('-')[0],
        'link': link
    })

with open('linksPaisesImagenesScrapeadas.json', 'w') as f:
    json.dump(json_links, f, indent=4)