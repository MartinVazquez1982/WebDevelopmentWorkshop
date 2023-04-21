from bs4 import BeautifulSoup
import requests


def get_all_countrys():

    url = 'https://recetasdeviajes.com/cocinas-del-mundo/'
    response = requests.get(url)
    html_doc = response.content

    soup = BeautifulSoup(html_doc, 'html.parser')

    page = soup.find(id='page')
    entry = page.find('div',{'class':'entry'})
    recetas = entry.find_all('a')


    recetasArr = []
    for receta in recetas:
        name = receta.text
        link_pais = receta['href']
        rece = {
            'name_pais': name,
            'link_pais': link_pais
        }
        recetasArr.append(rece)
        # print(name, link_pais)

    return recetasArr

def get_links_recetas_pais(link_pais):
    response = requests.get(link_pais)
    html_doc = response.content

    soup = BeautifulSoup(html_doc, 'html.parser')
    recetas = soup.find_all('a',{'class':'more-link'})
    linksArr = []
    for i in recetas:
        linksArr.append(i['href'])
        # print(i['href'])
    return linksArr

def get_receta(link_receta):
    response = requests.get(link_receta)
    html_doc = response.content

    soup = BeautifulSoup(html_doc, 'html.parser')
    page = soup.find('div',{'id':'page'})
    datos = page.find('div',{'class':'entry'})
    nombre = datos.find('h1',{'class':'post-title'}).a.text
    imagen = datos.find('img')['src']
    ingredientesUL = datos.find_all('ul',limit=2)
    
    if (len(ingredientesUL) == 2):
        ingredientesUL = ingredientesUL[1]
    else:
        return {
            'nombre': nombre,
            'imagen': imagen,
        }

    ingredientes = []
    for ingrediente in ingredientesUL.find_all('li'):
        ingredientes.append(ingrediente.text)

    return {
        'nombre': nombre,
        'imagen': imagen,
        'ingredientes': ingredientes
    }


import json

with open('recetasScrapeadas.json') as f:
    recetas = json.load(f)

for pais in get_all_countrys():
    objeto = {
        "nombre": pais['name_pais'],
        "recetas": []
    }
    print("pais : ", pais['name_pais'])
    print("link : ")
    for link in get_links_recetas_pais(pais['link_pais']):
        print("   ", link)
        objeto['recetas'].append(get_receta(link))
        get_receta(link)
    
    recetas.append(objeto)

with open('recetasScrapeadas.json', 'w') as f:
    json.dump(recetas, f, indent=4)




