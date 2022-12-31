 let deckID
 const cardsContainer = document.getElementById("cards")
 document.getElementById('new-deck').addEventListener('click',handleNewDeck)

function handleNewDeck () {
     fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/')
     .then(response => response.json())
     .then( dataCard => {
         deckID = dataCard.deck_id
         console.log(dataCard)
        })
    }

    
const handleDrawCard = () => {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />`
                
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />`
        } )
    }
    
document.getElementById('draw-card').addEventListener('click',handleDrawCard)
