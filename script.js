document.addEventListener('DOMContentLoaded', function () {
    const colorBox = document.getElementById('color-box');
    const generateBtn = document.getElementById('generate-btn');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const copiedText = document.getElementById('copied-text');

    generateBtn.addEventListener('click', generateColors);
    searchBtn.addEventListener('click', searchColor);

    function generateColors() {
        const baseColor = getRandomColor();
        const shades = generateShades(baseColor, 5);

        colorBox.innerHTML = '';

        for (let i = 0; i < shades.length; i++) {
            const colorCard = createColorCard(shades[i]);
            colorBox.appendChild(colorCard);
        }
    }

    function createColorCard(hexCode) {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';

        const colorBoxDiv = document.createElement('div');
        colorBoxDiv.className = 'color-box';
        colorBoxDiv.style.backgroundColor = hexCode;

        colorBoxDiv.addEventListener('click', function () {
            copyToClipboard(hexCode);
            showCopiedMessage(hexCode);
        });

        const hexCodeSpan = document.createElement('span');
        hexCodeSpan.textContent = hexCode;

        colorBoxDiv.appendChild(hexCodeSpan);
        colorCard.appendChild(colorBoxDiv);

        return colorCard;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function generateShades(baseColor, count) {
        const shades = [];
        const base = tinycolor(baseColor);

        for (let i = 0; i < count; i++) {
            const shade = base.clone().lighten(i * 10).toString();
            shades.push(shade);
        }

        return shades;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => { })
            .catch(err => {
                console.error('Unable to copy to clipboard', err);
            });
    }

    function showCopiedMessage(hexCode) {
        copiedText.textContent = `Copied: ${hexCode}`;
        setTimeout(() => {
            copiedText.textContent = '';
        }, 3000);
    }

    function searchColor() {
        const searchValue = searchInput.value.trim().toLowerCase();
        if (searchValue !== '') {
            const colorInfo = tinycolor(searchValue);

            if (colorInfo.isValid()) {
                displayColorInfo(colorInfo);
            } else {
                alert('Invalid color input. Please enter a valid color name, hex code, or RGB value.');
            }
        } else {
            alert('Please enter a color to search.');
        }
    }

    function displayColorInfo(colorInfo) {
        colorBox.innerHTML = '';
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';

        const colorBoxDiv = document.createElement('div');
        colorBoxDiv.className = 'color-box';
        colorBoxDiv.style.backgroundColor = colorInfo.toHexString();

        const hexCodeSpan = document.createElement('span');
        hexCodeSpan.textContent = colorInfo.toHexString();
        hexCodeSpan.className = 'color-hex';

        colorBoxDiv.appendChild(hexCodeSpan);
        colorCard.appendChild(colorBoxDiv);

        const colorInfoDiv = document.createElement('div');
        colorInfoDiv.className = 'color-info';

        // Display Hex Code
        const hexCodeParagraph = document.createElement('p');
        hexCodeParagraph.className = 'color-hex';
        hexCodeParagraph.textContent = `Hex Code: ${colorInfo.toHexString()}`;
        colorInfoDiv.appendChild(hexCodeParagraph);

        // Display RGB Code
        const rgbParagraph = document.createElement('p');
        rgbParagraph.className = 'color-rgb';
        rgbParagraph.textContent = `RGB: ${colorInfo.toRgbString()}`;
        colorInfoDiv.appendChild(rgbParagraph);

        // Display Lighten and Darken Colors
        const lightenDarkenParagraph = document.createElement('p');
        lightenDarkenParagraph.className = 'color-lighten-darken';

        // Lighten Color Box
        const lightenColorBox = document.createElement('div');
        lightenColorBox.className = 'color-box';
        lightenColorBox.style.backgroundColor = colorInfo.lighten(10).toHexString();

        const lightenHexCode = document.createElement('span');
        lightenHexCode.textContent = colorInfo.lighten(10).toHexString();
        lightenColorBox.appendChild(lightenHexCode);

        lightenDarkenParagraph.appendChild(lightenColorBox);

        const marginBetweenColors = document.createElement('span');
        marginBetweenColors.style.margin = '0 10px';
        lightenDarkenParagraph.appendChild(marginBetweenColors);

        const darkenColorBox = document.createElement('div');
        darkenColorBox.className = 'color-box';
        darkenColorBox.style.backgroundColor = colorInfo.darken(10).toHexString();

        const darkenHexCode = document.createElement('span');
        darkenHexCode.textContent = colorInfo.darken(10).toHexString();
        darkenColorBox.appendChild(darkenHexCode);

        lightenDarkenParagraph.appendChild(darkenColorBox);

        colorInfoDiv.appendChild(lightenDarkenParagraph);

        colorCard.appendChild(colorInfoDiv);
        colorBox.appendChild(colorCard);

        lightenColorBox.addEventListener('click', function () {
            copyToClipboard(colorInfo.lighten(10).toHexString());
            showCopiedMessage(colorInfo.lighten(10).toHexString());
        });

        darkenColorBox.addEventListener('click', function () {
            copyToClipboard(colorInfo.darken(10).toHexString());
            showCopiedMessage(colorInfo.darken(10).toHexString());
        });
    }
});
