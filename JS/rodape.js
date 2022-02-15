let rodapeData = [
    {
        url: "https://www.instagram.com/oigordev/",
        label: "@oigordev"
    },
    {
        url: "https://www.instagram.com/godsledpotato/",
        label: "@godsledpotato"
    },
    {
        url: "https://www.twitch.tv/godsledpotato",
        label: "Twitch - GodsledPOTATO"
    },
    {
        url: "https://www.linkedin.com/in/igor-balbino-dev",
        label: "LikedIn - Igor Balbino"
    },
    {
        url: "https://github.com/igorbalbino",
        label: "Github"
    }
];

function createRodape (element) {
    let sectionElement = document.createElement('section');
    let divMessageElement = document.createElement('div');
    let divLinksElement = document.createElement('div');
    let spanElement = document.createElement('span');

    sectionElement.classList.add('d-flex justify-content-center justify-content-lg-between p-4 border-bottom');
    divMessageElement.classList.add('me-5 d-none d-lg-block');

    spanElement.innerHTML = 'Get connected with us on social networks:';
    spanElement.innerText = 'Get connected with us on social networks:';

    divMessageElement.append(spanElement);
    
    rodapeData.forEach((data) => {
        let aElement = document.createElement('a');
        let iElement = document.createElement('i');

        aElement.classList.add('me-4 text-reset');
        iElement.classList.add('fab fa-twitch');

        aElement.setAttribute('href', data.url);
        aElement.setAttribute('target', '_blank');
        
        iElement.innerHTML = data.label;
        iElement.innerText = data.label;

        aElement.append(iElement);

        divLinksElement.append(aElement);
    });

    sectionElement.append(divMessageElement);
    sectionElement.append(divLinksElement);

    element.append(sectionElement);
}