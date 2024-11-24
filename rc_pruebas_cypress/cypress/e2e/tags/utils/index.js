import { faker } from '@faker-js/faker';

function randomIndex(maximo) {
    return Math.floor(Math.random() * (maximo + 1));
}


function generarTagAleatoria() {
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence()
    };
}

function generarTagAleatoriaWithShortSlug() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: generateTextWithoutSpaces(190),
        description: faker.lorem.sentence()
    };
}

function generarTagAleatoriaWithLongSlug() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: generateTextWithoutSpaces(192),
        description: faker.lorem.sentence()
    };
}

function generarTagAleatoriaWithShortDescription() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: generateTextWithoutSpaces(499)
    };
}

function generarTagAleatoriaWithLongDescription() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: generateTextWithoutSpaces(501)
    };
}

function generarTagAleatoriaWithShortName() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: generateTextWithoutSpaces(190),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence()
    };
}

function generarTagAleatoriaWithLongName() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: generateTextWithoutSpaces(192),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence()
    };
}

function generarTagsAleatorias(cantidad, slugType) {
    let tags = [];
    for (let i = 0; i < cantidad; i++) {
        if(slugType == "SHORT_SLUG") { 
            tags.push(generarTagAleatoriaWithShortSlug());
        }else if(slugType == "LONG_SLUG") { 
            tags.push(generarTagAleatoriaWithLongSlug());
        } else if(slugType == "SHORT_DESCRIPTION") { 
            tags.push(generarTagAleatoriaWithShortDescription());
        } else if(slugType == "LONG_DESCRIPTION") { 
            tags.push(generarTagAleatoriaWithLongDescription());
        } else if(slugType == "SHORT_NAME") { 
            tags.push(generarTagAleatoriaWithShortName());
        } else if(slugType == "LONG_NAME") { 
            tags.push(generarTagAleatoriaWithLongName());
        } else {
            tags.push(generarTagAleatoria());
        }
        
    }
    return tags;
  }

function generateTextWithoutSpaces(length) {
    let text = '';
  
    while (text.length < length) {
      const word = faker.lorem.word();
      text += word;
    }
  
    return text.substr(0, length);
}
  
export {
    randomIndex,
    generarTagAleatoria,
    generarTagAleatoriaWithShortSlug,
    generarTagAleatoriaWithLongSlug,
    generarTagAleatoriaWithShortDescription,
    generarTagAleatoriaWithLongDescription,
    generarTagAleatoriaWithShortName,
    generarTagAleatoriaWithLongName,
    generarTagsAleatorias,
    generateTextWithoutSpaces

}