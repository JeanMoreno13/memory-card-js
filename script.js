const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Affecte un ordre aléatoire aux cartes
(function shuffleCards(){
    cards.forEach(card => {
        var randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

function flipCard(){
    if(lockBoard)return;
    if(this === firstCard)return;

    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
        
    secondCard = this;
    checkForMatch();
}

// Stockage du bon résultat, si il est true call disableCards sinon unflipCard
function checkForMatch(){
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

// Match 
function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard();   
}
        
// No Match ,remove la class "flip" et reset le board
function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    },1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card=>card.addEventListener('click',flipCard));