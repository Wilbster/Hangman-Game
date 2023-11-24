const $hint = $('.hint')
const $letterContainer = $('.letterContainer')
const $message = $('.message')
const $guessedLetter = $('.guessedLetter')
const $submit = $('.submit')
const $alreadyGuessed = $('.alreadyGuessed')

$guessedLetter.on("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        $submit.click();
    }
});

let $letter
let alreadyGuessed = []
let goodGuess
let theGuess
let guessedLetter
let badGuesses = 0

function startGame() {
    let randomInt = Math.floor(Math.random() * 1000)
    let word = Object.keys(words)[randomInt]
    let upperCaseWord = word.toUpperCase()
    let numberOfLettersToGuess = word.length

    $hint.html(words[word])

    for (let letter of upperCaseWord) {
        $letterContainer.append(
            `<div class="letterBox">
                <div class="letter"><p>${letter}</p></div>
                <div class="blank"><p>_</p></div>
            </div>`
        )
    }
    
    $letter = $('.letter')
}
startGame()

let $currentImg
const $playAgain = $('.playAgain')

$submit.click(function () {
    theGuess = $guessedLetter.val()
    $guessedLetter.val('')
    $message.html('')

    if (!theGuess.match(/[a-zA-Z]/i)) {
        $message.html('<p>Please guess a letter!</p>')
        return
    }

    guessedLetter = theGuess.toUpperCase()

    if (!alreadyGuessed.includes(guessedLetter)) {
        goodGuess = false
        $letter.each(function () {
            if ($(this).html() == `<p>${guessedLetter}</p>`) {
                $message.html('<p>NICE ONE!!</p>')
                $(this).css('display', 'block')
                $(this).next().css('display', 'none')
                goodGuess = true
                numberOfLettersToGuess--

                if (numberOfLettersToGuess == 0) {
                    $message.html('<p>YOU WIIIN!!</p>')
                    $submit.prop('disabled', true)
                    $guessedLetter.prop('disabled', true)
                    $playAgain.css('display', 'block')
                }
            }
        }
        )
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
        alreadyGuessed.push(guessedLetter)
        $alreadyGuessed.append(`<p>${guessedLetter}</p>`)
    } else { $message.html('<p>You already guessed that!</p>') }
})

$playAgain.click(function () {
    $message.html('')
    $guessedLetter.val('')
    for (let i = 1; i < 7; i++) {
        $currentImg = $(`#img${i}`)
        if ($currentImg.css('opacity') == '1') {
            $currentImg.css('animation', 'fade-out .5s forwards')
        }
    }
    alreadyGuessed = []
    $alreadyGuessed.html('')
    badGuesses = 0
    $letterContainer.html('')

    $submit.prop('disabled', false)
    $guessedLetter.prop('disabled', false)
    $playAgain.css('display', 'none')

    startGame()
})