function getLocation() {
    var reverseGeocoder = new BDCReverseGeocode();
    reverseGeocoder.localityLanguage = 'fr';

    reverseGeocoder.getClientLocation(function (result) {
        if (result) {
            document.getElementById("city").value = result.locality + ', ' + result.countryName;
        } else {
            document.getElementById("city").value = 'Unknown';
        }
    });

}

function saveScoreToFile(callback) {

    // scores dans le localStorage
    let dbLocalStorage = window.localStorage.getItem("escapethejail-db-hof");
    let db;
    if (dbLocalStorage == null) {
        loadHofInLocalStorage("game");
    } else {
        db = JSON.parse(dbLocalStorage);
    }

    // nom du joueur
    let name = document.getElementById("name").value;
    if (name != "") {
        let city = document.getElementById("city").value;
        // récup du temps
        let score = window.localStorage.getItem("escapethejail-score");
        let displayScore;
        var minutes = score / 60000;
        var secondes = (minutes - Math.floor(minutes)) * 60;

        if (Math.floor(secondes) < 10)
            displayScore = Math.floor(minutes) + ":0" + Math.floor(secondes);
        else
            displayScore = Math.floor(minutes) + ":" + Math.floor(secondes);


        let level = window.localStorage.getItem("escapethejail-level");
        // si on a un score à ajouter
        if (score != null) {

            // date du jour au format yyyy-mm-dd
            let m = new Date();
            let dateString =
                m.getUTCFullYear() + "-" +
                ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
                ("0" + m.getUTCDate()).slice(-2);

            // ajout des informations du joueur dans le fichier des scores
            if (db != null) {
                let item = {
                    name: name,
                    score: score,
                    timestamp: dateString,
                    city: city,
                    level: level,
                    displayScore: displayScore
                };
                db.push(item);
            }

            // écriture du fichier des scores
            window.localStorage.setItem("escapethejail-db-hof", JSON.stringify(db));

            document.getElementById("name").value = '';
            document.getElementById("city").value = 'Unknown';


            // effacer les données de la parties actuelles (éviter de rajouter plusieurs fois le même score avec F5)
            window.localStorage.removeItem("escapethejail-score");
            window.localStorage.removeItem("escapethejail-level");

        } else {
            console.log("No score to process");
        }
        callback();
    } else {
        window.alert("Merci de saisir un nom");
    }

}


function loadHofInLocalStorage() {
    // chargement du fichier des scores (hof.db)
    let db;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            db = JSON.parse(this.responseText);
            console.log("Base de données des scores chargée. Creating local storage copy");
            window.localStorage.setItem("escapethejail-db-hof", JSON.stringify(db));

        } else if (this.status == 404) {
            console.log("Base de données des scores introuvable.")
        }
    };
    xhttp.open("GET", "db/hof.json", false); // FALSE POUR ATTENDRE LA RÉPONSE
    xhttp.send();
}


function showHof() {

    document.getElementById("hof").innerText = '';

    // scores dans le localStorage
    let dbLocalStorage = window.localStorage.getItem("escapethejail-db-hof");
    let db;
    if (dbLocalStorage == null) {
        loadHofInLocalStorage();
        console.log('On créé le stockage');
    } else {
        db = JSON.parse(dbLocalStorage);
        console.log(db);
    }


    if (db != null) {
        if (db.length > 0) {
            // tri des enregistrements
            db.sort(function (b, a) {
                return parseInt(b.score) - parseInt(a.score);
            });

            // affichage
            tableHof = document.getElementById("hof");

            // entête
            header = tableHof.createTHead();
            row = header.insertRow(-1);
            row.insertCell(0).innerHTML = "";
            row.insertCell(1).innerHTML = "Joueur"
            row.insertCell(2).innerHTML = "Ville"
            row.insertCell(3).innerHTML = "Score"
            row.insertCell(4).innerHTML = "Date"

            body = tableHof.createTBody();

            var dbLevel1 = [];
            var dbLevel2 = [];
            var dbLevel3 = [];
            var i1 = 0;
            var i2 = 0;
            var i3 = 0;

            for (var line in db) {

                if (i1 < 3 && db[line].level == 1) {
                    dbLevel1[i1] = db[line];
                    i1++;
                } else if (i2 < 3 && db[line].level == 2) {
                    dbLevel2[i2] = db[line];
                    i2++;
                } else if (i3 < 3 && db[line].level == 3) {
                    dbLevel3[i3] = db[line];
                    i3++;
                }

            }

            var nameReduced;

            if (dbLevel1.length > 0) {
                row = body.insertRow(-1);
                row.insertCell(0).innerHTML = 'Niveau 1';
                row.className = 'level';
                for (var line in dbLevel1) {
                    row = body.insertRow(-1);
                    row.insertCell(0).innerHTML = (+line + 1);
                    nameReduced = dbLevel1[line].name.substring(0, 15);
                    row.insertCell(1).innerHTML = nameReduced;
                    row.insertCell(2).innerHTML = dbLevel1[line].city;
                    row.insertCell(3).innerHTML = dbLevel1[line].displayScore;
                    row.insertCell(4).innerHTML = dbLevel1[line].timestamp;
                }
            }

            if (dbLevel2.length > 0) {
                row = body.insertRow(-1);
                row.insertCell(0).innerHTML = 'Niveau 2';
                row.className = 'level';
                for (var line in dbLevel2) {
                    row = body.insertRow(-1);
                    row.insertCell(0).innerHTML = (+line + 1);
                    nameReduced = dbLevel2[line].name.substring(0, 15);
                    row.insertCell(1).innerHTML = nameReduced;
                    row.insertCell(2).innerHTML = dbLevel2[line].city;
                    row.insertCell(3).innerHTML = dbLevel2[line].displayScore;
                    row.insertCell(4).innerHTML = dbLevel2[line].timestamp;
                }
            }

            if (dbLevel3.length > 0) {
                row = body.insertRow(-1);
                row.insertCell(0).innerHTML = 'Niveau 3';
                row.className = 'level';
                for (var line in dbLevel3) {
                    row = body.insertRow(-1);
                    row.insertCell(0).innerHTML = (+line + 1);
                    nameReduced = dbLevel3[line].name.substring(0, 15);
                    row.insertCell(1).innerHTML = nameReduced;
                    row.insertCell(2).innerHTML = dbLevel3[line].city;
                    row.insertCell(3).innerHTML = dbLevel3[line].displayScore;
                    row.insertCell(4).innerHTML = dbLevel3[line].timestamp;
                }
            }
        } else {
            document.getElementById("hof").innerText = "Pas de scores à afficher";
        }
    }
}
