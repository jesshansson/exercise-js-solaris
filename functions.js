//Funktionen tar en sträng som argument och returnerar en ny sträng där den första bokstaven är versal och resten av bokstäverna är oförändrade
function capitalizeWord(word) {
	if (word.length === 0) return word;
	return word.charAt(0).toUpperCase() + word.slice(1);
}

//Funktionen hämtar ett specifikt attribut för en planet från data som är lagrat i localStorage under nyckeln bodies
// example:
// getplanetAttributes(3, "moons");     // returns: ["Månen"]
// getplanetAttributes(3, "moons")[0];  // returns: "Månen"
// getPlanetAttribute(5, "moons");      // returns: ["Europa", "Ganymedes", "Io", "Callisto", "Amalthea", "Himalia"]
function getPlanetAttribute(i, attribute) {
	// console.log(`running getPlanetAttributes(${i}, ${attribute})`);
	const storedData = JSON.parse(localStorage.getItem("bodies"));
	const planetAttr = storedData[i][attribute];
	return planetAttr;
}

// Funktion för att ta bort ett element från en array vid ett specifikt index och returnera en ny array med det elementet borttaget.
// example:
// removeElementAtIndex([a,b,c,d,e], 3);       // returns: [a,b,c,e]
// removeElementAtIndex([a,b], 3);             // returns: [a,b]
function removeElementAtIndex(arr, i) {
	if (i < 0 || i >= arr.length) {
		throw new Error("Index out of bounds.");
	}

	return arr.slice(0, i).concat(arr.slice(i + 1));
}

//Tar bort det första förekomsten av ett specifikt element från en array och returnerar en ny array med det elementet borttaget.
// example: arr = ["a", "b", "c", "d", "e"];
// removeElementFromArr(arr, "d");             / returns: ["a", "b", "c", "e"]
function removeElementFromArr(arr = [], element) {
	if (arr.length === 0) {
		throw new Error("Array is empty. Returning unchanged array.");
	}
	const match = (e) => e === element;
	const indexToRemove = arr.findIndex(match);
	return arr.slice(0, indexToRemove).concat(arr.slice(indexToRemove + 1));
}

//Funktion för att lägga till planet i favoriter
function addToFavorites(planetName) {
	let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

	if (!favorites.includes(planetName)) {
		favorites.push(planetName);
		localStorage.setItem("favorites", JSON.stringify(favorites));
		document.getElementById("addFavorite").disabled = true;
		alert(`${planetName} har lagts till i din favoritlista.`);
	} else {
		alert(`${planetName} finns redan i din favoritlista.`);
	}
	updateFavoriteButtons(capitalizeWord(planetName));
}

//Funktion för att ta bort planet från favoriter
function removeFromFavorites(planetName) {
	let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

	if (favorites.includes(planetName)) {
		favorites = removeElementFromArr(favorites, planetName);
		console.log(favorites);
		localStorage.setItem("favorites", JSON.stringify(favorites));
		alert(`${planetName} har tagits bort från din favoritlista.`);
	} else {
		alert(`${planetName} finns inte med i din favoritlista.`);
	}
	updateFavoriteButtons(capitalizeWord(planetName));
}

function updateFavoriteButtons(planetName) {
	//
	// avgör vilken av knapparna "lägg till favorit" och "ta bort favorit" som ska vara disabled ("lägg till" ska vara disabled om den aktuella planeten redan finns i favoritlistan.)

	let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

	if (favorites.includes(planetName)) {
		document.getElementById("addFavorite").disabled = true;
		document.getElementById("removeFavorite").disabled = false;
	} else {
		document.getElementById("addFavorite").disabled = false;
		document.getElementById("removeFavorite").disabled = true;
	}
}

function enableFavorites(planetName) {
	document.getElementById("addFavorite").disabled = false;
}

/*
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);
		const planet = params.get("planet");
*/
