 let deckID
 let computerScore = 0
let myScore = 0
 const cardsContainer = document.getElementById("cards")
 const header = document.getElementById("header")
 const displaycount = document.getElementById("remaining")
 const drawCard = document.getElementById('draw-card')
 const computerScoreEl = document.getElementById("computer-score")
 const myScoreEl = document.getElementById("my-score")

 document.getElementById('new-deck').addEventListener('click',handleNewDeck)

async function handleNewDeck () {
    drawCard.disabled = false
    computerScore = 0
    myScore = 0
    computerScoreEl.textContent = `Computer score: ${computerScore}`
    myScoreEl.textContent = `My score: ${myScore}`
    const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/')
    console.log(response)
    const dataCard = await response.json()
    console.log(dataCard)
    displaycount.textContent = `Remaining Count : ${dataCard.remaining}`
    deckID = dataCard.deck_id
    // console.log(dataCard)
    header.textContent = `Draw Cards! `
        
}

drawCard.addEventListener('click',handleDrawCard)

 async function handleDrawCard () {
        const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
        const data = await response.json()
        displaycount.textContent = `Remaining Count : ${data.remaining}`
           
        cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" />`
                
        cardsContainer.children[1].innerHTML = `
             <img src=${data.cards[1].image} class="card" />`
            
        const winnerText = determineCardWinner(data.cards[0],data.cards[1])
        header.textContent = winnerText
        if (data.remaining === 0) {
             drawCard.disabled = true
                if (computerScore > myScore){
                     header.textContent = `Computer Won the Game!`
                } else if (myScore < computerScore ) {
                    header.textContent = `You Won the Game!`
                } else {
                     header.textContent = `Game Draw`
                 }
             }
    }
    

function determineCardWinner(card1 , card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const cardValue1Index = valueOptions.indexOf(card1.value)
    const cardValue2Index = valueOptions.indexOf(card2.value)
    console.log(cardValue1Index)
    console.log(cardValue2Index)

if ( cardValue1Index >cardValue2Index ) {
    computerScore++
    computerScoreEl.textContent = `Computer score: ${computerScore}`
    return `Computer Wins`
    
} else  if(cardValue1Index < cardValue2Index ){
    myScore++
    myScoreEl.textContent = `My score: ${myScore}`
    return `You Win`
} else {
    return `War!!!`
}

}