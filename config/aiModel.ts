// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-1.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `write a script to generate 30 seconds video on topic: interesting historical story along with Ai image prompt in realistic format in each scene and give result in json format with imageprompt and contenttext as field`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
[
  {
    "scene": 1,
    "imageprompt": "A weathered, stone obelisk standing in a windswept desert, hieroglyphs carved on its surface, bathed in golden sunlight.  Epic and ancient atmosphere.  Realistic photograph.",
    "contenttext": "The discovery of the Rosetta Stone in 1799. This incredible artifact unlocked the secrets of ancient Egyptian hieroglyphs, allowing scholars to finally understand a civilization that had been shrouded in mystery for centuries."
  },
  {
    "scene": 2,
    "imageprompt": "A detailed, oil painting depicting a bustling marketplace in ancient Rome. Merchants selling goods, crowds of people, and iconic Roman architecture visible in the background. Highly detailed, realistic.",
    "contenttext": "The Punic Wars (264-146 BC). A series of three major wars fought between Rome and Carthage, shaping the rise of Rome as a dominant power in the Mediterranean."
  },
  {
    "scene": 3,
    "imageprompt": "A dramatic photograph of Leonardo da Vinci working on the Mona Lisa in his studio, surrounded by artistic tools and sketches. Soft, diffused lighting. Realistic and evocative.",
    "contenttext": "The invention of the printing press by Johannes Gutenberg around 1440. This revolutionary technology democratized knowledge, leading to the Renaissance and the Reformation."
  },
  {
    "scene": 4,
    "imageprompt": "A cinematic image of Marie Curie in a laboratory, surrounded by scientific equipment.  She's focused and determined, wearing a lab coat.  Dramatic lighting, realistically rendered.",
    "contenttext": "The discovery of penicillin by Alexander Fleming in 1928. This accidental discovery marked the beginning of the antibiotic era, dramatically changing the course of medicine."
  },
  {
    "scene": 5,
    "imageprompt": "A photorealistic depiction of Alan Turing in a 1950s computing environment, surrounded by early computers.  He looks thoughtful and intense.  Slightly grainy, vintage feel.",
    "contenttext": "Alan Turing and the Enigma Code.  During World War II, Turing's work on breaking the German Enigma code was crucial to the Allied victory."
  },
  {
    "scene": 6,
    "imageprompt": "A bustling scene of the moon landing, with Buzz Aldrin descending the ladder on the lunar surface.  Earth visible in the background.  Highly detailed and realistic photography.",
    "contenttext": "The Apollo 11 mission in 1969.  Neil Armstrong's first steps on the moon were a monumental achievement of human exploration and ingenuity."
  },
  {
    "scene": 7,
    "imageprompt": "A vibrant and detailed illustration of the building of the Great Wall of China, showing workers building the wall over many years.  Realistic architectural detail and landscape.  Epic scale.",
    "contenttext": "The construction of the Great Wall of China, a colossal fortification built over centuries to protect the Chinese Empire from invaders."
  },
    {
    "scene": 8,
    "imageprompt": "A sepia-toned photograph of a group of people protesting for civil rights, holding signs and marching.  Realistic and emotionally charged.",
    "contenttext": "The Civil Rights Movement in the United States (1950s-1960s). A pivotal period in American history fighting for equality and justice."
  },
    {
    "scene": 9,
    "imageprompt": "A futuristic cityscape of Tokyo with neon lights and towering skyscrapers.  Cyberpunk aesthetic, realistic rendering.",
    "contenttext": "The rapid technological advancement of Japan in the late 20th and early 21st centuries."
  },
  {
    "scene": 10,
    "imageprompt": "A detailed, realistic depiction of the building of the pyramids of Giza, showing the immense scale and engineering involved.  Ancient Egyptian landscape, warm lighting.",
    "contenttext": "The construction of the pyramids of Giza, one of the Seven Wonders of the Ancient World, a testament to ancient Egyptian engineering prowess."
  },
  {
    "scene": 11,
    "imageprompt": "A photo of the construction of the Taj Mahal, with a focus on the intricate details of the marble architecture and the gardens.  Realistic and romantic.",
    "contenttext": "The Taj Mahal, built in the 17th century as a mausoleum by Mughal emperor Shah Jahan for his wife Mumtaz Mahal. A symbol of love and architectural excellence."
  },
  {
    "scene": 12,
    "imageprompt": "A depiction of the Manhattan Project during World War II, with scientists working in a lab.  Realistic and intense atmosphere,  shadows and scientific equipment.",
    "contenttext": "The Manhattan Project, a top-secret research and development undertaking during World War II that led to the creation of the first atomic bombs."
  },
  {
    "scene": 13,
    "imageprompt": "A photorealistic image of the first computer programmer, Ada Lovelace, seated at a desk, surrounded by mathematical equations. Victorian era clothing, scholarly atmosphere.",
    "contenttext": "Ada Lovelace, considered by many to be the first computer programmer, envisioned the potential of Charles Babbage's Analytical Engine."
  },
  {
    "scene": 14,
    "imageprompt": "A detailed rendering of the Titanic sinking, showing the ship breaking apart in the icy waters. Realistic and dramatic depiction.",
    "contenttext": "The sinking of the Titanic in 1912, a maritime disaster that claimed the lives of over 1,500 people."
  },
  {
    "scene": 15,
    "imageprompt": "A realistic depiction of the Wright brothers in their workshop, experimenting with their first airplane.  Vintage aesthetic, early 20th century.",
    "contenttext": "The Wright brothers' first successful flight in 1903, marking the beginning of the age of aviation."
  },
  {
    "scene": 16,
    "imageprompt": "A photograph of a Native American tribe performing a traditional ceremony. Authentic attire, realistic representation of cultural practices.",
    "contenttext": "The vibrant cultures and traditions of various Native American tribes across North America."
  },
  {
    "scene": 17,
    "imageprompt": "A photorealistic depiction of a bustling Victorian London street scene.  Gas lamps, horse-drawn carriages, and ornate buildings.  Detailed and atmospheric.",
    "contenttext": "Victorian London in the 1880s, a period of rapid industrialization and social change."
  },
  {
    "scene": 18,
    "imageprompt": "A detailed illustration of the construction of the Hoover Dam, showing the massive concrete structure and the surrounding landscape.  Realistic engineering depiction.",
    "contenttext": "The construction of the Hoover Dam, a feat of engineering that provided hydroelectric power and irrigation to the American Southwest."
  },
  {
    "scene": 19,
    "imageprompt": "A realistic image of the signing of the Declaration of Independence, showing the Founding Fathers gathered around a table.  Historical accuracy, formal attire.",
    "contenttext": "The signing of the Declaration of Independence in 1776, a pivotal moment in the American Revolution and the birth of a new nation."
  },
  {
    "scene": 20,
    "imageprompt": "A detailed depiction of the construction of the Great Lighthouse of Alexandria, showing the intricate details of the structure and the surrounding harbor. Realistic architectural rendering.",
    "contenttext": "The Great Lighthouse of Alexandria, one of the Seven Wonders of the Ancient World, a beacon of navigation and technological advancement."
  },
  {
    "scene": 21,
    "imageprompt": "A photorealistic depiction of the invention of the telephone by Alexander Graham Bell.  He is demonstrating the device.  Early 20th century setting.",
    "contenttext": "Alexander Graham Bell's invention of the telephone in 1876 revolutionized communication."
  },
  {
    "scene": 22,
    "imageprompt": "A vibrant image of the Renaissance art scene in Florence, Italy.  Artists and patrons in a gallery, showcasing masterpieces.  Realistic and opulent.",
    "contenttext": "The Italian Renaissance, a period of artistic, scientific, and cultural flourishing in Europe."
  },
  {
    "scene": 23,
    "imageprompt": "A detailed, realistic portrayal of the building of the Roman Colosseum, showcasing its grandeur and scale. Ancient Roman architecture, warm lighting.",
    "contenttext": "The construction of the Roman Colosseum, an iconic amphitheater that hosted gladiatorial contests and public spectacles."
  },
  {
    "scene": 24,
    "imageprompt": "A dramatic scene from the French Revolution, showing revolutionaries marching through the streets of Paris.  Realistic and chaotic atmosphere.",
    "contenttext": "The French Revolution (1789-1799), a period of radical social and political upheaval in late 1`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
