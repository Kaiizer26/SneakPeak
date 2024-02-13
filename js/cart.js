let iconCart= document.querySelector('.icon-cart');
let closeCart = document.querySelector('#close');
let body = document.querySelector('body');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})


// Initialisation de Flickity
var elem = document.querySelector('.article-section');
var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true
});

// Déclaration du panier
var panier = [];

// Fonction pour ajouter un article au panier
function ajouterAuPanier(nom, prix) {
    panier.push({ nom: nom, prix: prix });
    afficherPanier();
}

// Fonction pour afficher le panier
function afficherPanier() {
    var panierElement = document.querySelector('.product-panier');
    panierElement.innerHTML = '';
    var total = 0;
    panier.forEach(function (article, index) {
        var articleElement = document.createElement('article');
        articleElement.innerHTML = '<div class="text-logo"><p>' + article.nom + '</p><div class="opacity-on-mouse"><p>' + article.prix + ' €</p></div></div>' +
                                    index;
        panierElement.appendChild(articleElement);
        total += article.prix;
    });
    document.getElementById('total').innerText = total.toFixed(2);

    // Ajouter des écouteurs d'événements pour les boutons de suppression
    var removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var index = parseInt(button.getAttribute('data-index'));
            supprimerDuPanier(index);
        });
    });
}


// Event listeners pour les boutons "Fermer" et "Valider"
document.getElementById('close').addEventListener('click', function () {
    document.querySelector('aside').classList.remove('open');
});

document.getElementById('buy').addEventListener('click', function () {
    alert('Commande validée ! Total : ' + document.getElementById('total').innerText + ' €');
    panier = [];
    afficherPanier();
});

// Ajout d'événements pour les boutons "Ajouter au Panier" sur chaque article
var articles = document.querySelectorAll('.products article');
articles.forEach(function (article) {
    article.querySelector('.logo-group').addEventListener('click', function () {
        var nom = article.querySelector('.text-logo p').innerText;
        var prix = parseFloat(article.querySelector('.opacity-on-mouse p').innerText);
        ajouterAuPanier(nom, prix);
    });
});


// 2





 // Fonction pour ajouter un produit au panier
// Fonction pour ajouter un produit au panier
function ajouterAuPanier(nomProduit, prixProduit) {
    // Créer un nouvel élément d'article
    var nouvelArticle = document.createElement("article");

    // Contenu de l'article
    nouvelArticle.innerHTML =`        
        <div class="image">

            <img src="../images/img01 (4).avif" alt="${nomProduit}"> 
        </div>
        <div class="nom">
            <p>${nomProduit}</p>
        </div>
        <div class="details">   
            <p>${prixProduit} €</p>
            <button onclick="supprimerDuPanier(this)">Supprimer</button>
        </div>`
    ;

    // Ajouter l'article au panier
    var sectionPanier = document.querySelector(".product-panier");
    sectionPanier.appendChild(nouvelArticle);

    // Mettre à jour le nombre d'articles dans le panier
    var nombreArticles = sectionPanier.querySelectorAll("article").length;
    document.querySelector(".icon-cart span").textContent = nombreArticles;
}

// Fonction pour supprimer un produit du panier
function supprimerDuPanier(bouton) {
    // Supprimer l'article parent du bouton
    var articleASupprimer = bouton.parentNode.parentNode;
    articleASupprimer.remove();

    // Mettre à jour le nombre d'articles dans le panier
    var nombreArticles = document.querySelectorAll(".product-panier article").length;
    document.querySelector(".icon-cart span").textContent = nombreArticles;
}

// Exemple d'utilisation de la fonction d'ajout au panier
document.addEventListener("DOMContentLoaded", function() {
    var boutonAjouter = document.querySelectorAll(".button-main button");
    boutonAjouter.forEach(function(bouton) {
        bouton.addEventListener("click", function(event) {
            var article = event.target.closest("article");
            var nomProduit = article.querySelector(".text-logo p").textContent;
            var prixProduit = article.querySelector(".opacity-on-mouse p").textContent;
            var imgProduit= article.querySelector("article img").textContent;
            ajouterAuPanier(nomProduit, prixProduit);
        });
    });
});