//hint display area
const $hint = $('.hint')
//container of letter boxes to be displayed
const $lettersContainer = $('.lettersContainer')
//message to be displayed
const $message = $('.message')
//letter guess input box, submit button, display of letters that have been guessed
const $guessedLetter = $('.guessedLetter')
const $submit = $('.submit')
const $alreadyGuessed = $('.alreadyGuessed')

//make Enter button hit Submit instead of submitting form
$guessedLetter.on("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        $submit.click();
    }
});
//letter to be displayed in letter box, list of guessed letters
let $letter
let alreadyGuessed = []
//boolean of whether the guessed letter in among letters to be displayed
let goodGuess
//guessed letter that is entered
let theGuess
//guessed letter that is entered, capitalized
let guessedLetter
//number to keep track of number of incorrect guesses that have been made
let badGuesses = 0
//number to keep track of how many correct letters need to be guessed
let numberOfLettersToGuess

function startGame() {
    //randomly pick word from word collection object, make it uppercase
    let randomInt = Math.floor(Math.random() * 1000)
    let word = Object.keys(words)[randomInt]
    let upperCaseWord = word.toUpperCase()
    //count number of correct guesses to win
    numberOfLettersToGuess = word.length
    //display appropriate hint from word collection object
    $hint.html(words[word])
    //append word letters and blank lines into container box
    for (let letter of upperCaseWord) {
        $lettersContainer.append(
            `<div class="letterBox">
                <div class="letter"><p>${letter}</p></div>
                <div class="blank"><p>_</p></div>
            </div>`
        )
    }

    $letter = $('.letter')
}
startGame()

//jquery object for current hangman image iteration
let $currentImg
//button to restart the game
const $playAgain = $('.playAgain')

$submit.click(function () {
    //when guess is submitted, empty input box and message display
    theGuess = $guessedLetter.val()
    $guessedLetter.val('')
    $message.html('')
    //ask user to guess a letter if it was not a letter that was entered
    if (!theGuess.match(/[a-zA-Z]/i)) {
        $message.html('<p>Please guess a letter!</p>')
        return
    }
    //convert guessed letter to uppercase if it wasn't
    guessedLetter = theGuess.toUpperCase()
    //if the letter hasn't already been guessed
    if (!alreadyGuessed.includes(guessedLetter)) {
        goodGuess = false
        $letter.each(function () {
            //check each letter display box for the guessed letter. If one is, display it
            // and subtract one from the total number of correct letters needed to be guessed counted earlier
            if ($(this).html() == `<p>${guessedLetter}</p>`) {
                $message.html('<p>NICE ONE!!</p>')
                $(this).css('display', 'block')
                $(this).next().css('display', 'none')
                goodGuess = true
                numberOfLettersToGuess--
                //if the number of correct letters needed to guess reaches 0, the user wins
                //button to play again is presented
                if (numberOfLettersToGuess == 0) {
                    $message.html('<p>YOU WIIIN!!</p>')
                    $submit.prop('disabled', true)
                    $guessedLetter.prop('disabled', true)
                    $playAgain.css('display', 'block')
                }
            }
        }
        )
        //if the guessed letter is not in one of the letter boxes, add to count of bad guesses
        //display more complete image of hangman graphic on top
        //if the count of bad guesses reaches 6, the game ends, all letters are revealed and
        //the button to play again is presented
        if (goodGuess == false) {
            badGuesses++
            $currentImg = $(`#img${badGuesses}`)
            $currentImg.css('animation', 'fade-in .5s forwards')
            if (badGuesses < 6) {
                $message.html('<p>Baaaaaaaaaaaad guess!</p>')
            } else {
                $message.html('<p>GAAAMME OVER!!</p>')
                $submit.prop('disabled', true)
                $guessedLetter.prop('disabled', true)
                $playAgain.css('display', 'block')
                $letter.each(function () {
                    $(this).css('display', 'block')
                    $(this).next().css('display', 'none')
                })
            }
        }
        //the guessed letter is kept track of in a list and added to the display
        alreadyGuessed.push(guessedLetter)
        $alreadyGuessed.append(`<p>${guessedLetter}</p>`)
        //if the letter has already been guessed, a message indicates so
    } else { $message.html('<p>You already guessed that!</p>') }
})

//if the button to play again is pressed
$playAgain.click(function () {
    //input box and message display are emptied
    $message.html('')
    $guessedLetter.val('')
    //hangman consecutive images are faded out except for the first one 
    for (let i = 1; i < 7; i++) {
        $currentImg = $(`#img${i}`)
        if ($currentImg.css('opacity') == '1') {
            $currentImg.css('animation', 'fade-out .5s forwards')
        }
    }
    //list to keep track of guessed letters, and guessed letter display are emptied
    //number of bad guesses is reset to 0, letter boxes are removed from the container
    alreadyGuessed = []
    $alreadyGuessed.html('')
    badGuesses = 0
    $lettersContainer.html('')
    //submit button is enabled, letter input box is enabled, play again button is hidden
    $submit.prop('disabled', false)
    $guessedLetter.prop('disabled', false)
    $playAgain.css('display', 'none')
    //start game function is called again
    startGame()
})