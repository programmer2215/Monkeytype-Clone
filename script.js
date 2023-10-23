paras = [
    "The leather jacket showed the scars of being his favorite for years. It wore those scars with pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it character and had not overwhelmed to the point that it had become ratty. The jacket was in its prime and it knew it.",
    "It was a question of which of the two she preferred. On the one hand, the choice seemed simple. The more expensive one with a brand name would be the choice of most. It was the easy choice. The safe choice. But she wasn't sure she actually preferred it.",
    "Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.",
    "Frank knew there was a correct time and place to reveal his secret and this wasn't it. The issue was that the secret might be revealed despite his best attempt to keep it from coming out. At this point, it was out of his control and completely dependant on those around him who also knew the secret. They wouldn't purposely reveal it, or at least he believed that, but they could easily inadvertently expose it. It was going to be a long hour as he nervously eyed everyone around the table hoping they would keep their mouths shut.",
    "I've rented a car in Las Vegas and have reserved a hotel in Twentynine Palms which is just north of Joshua Tree. We'll drive from Las Vegas through Mojave National Preserve and possibly do a short hike on our way down. Then spend all day on Monday at Joshua Tree. We can decide the next morning if we want to do more in Joshua Tree or Mojave before we head back.",
    "Patricia's friend who was here hardly had any issues at all, but she wasn't telling the truth. Yesterday, before she left to go home, she heard that her husband is in the hospital and pretended to be surprised. It later came out that she was the person who had put him there."
]

para = paras[Math.round(Math.random() * (paras.length - 1))]
words = para.split(" ")
console.log(words)
let typedWords = ""
const cont = document.querySelector(".content")
const timer = document.querySelector(".timer")
const score = document.querySelector(".score")

let curPos = 0
let time = 30
let start = false
let id

function _(id){
    return document.getElementById(id)
}

for (let i = 0; i < para.length; i++){
    elem = document.createElement ("span")
    elem.classList.add ("letter")
    elem.setAttribute ("id", `l${i}`)
    elem.textContent = para[i]
    cont.appendChild(elem)
}

function setCursor(id){
    _(`l${id}`).classList.add ("cursor")
}

setCursor(curPos)

function checkWPM(){
    let count = 0
    typedWords.split(" ").forEach(
        (word, idx) => {
            if (word === words[idx]){
                console.log(word, words[idx])
                count ++
            }
        }
    )
    return count * 2
}

function changeTime(){
    if (time > 0){
        time--
        timer.textContent = time
    }else {
        clearInterval(id)
        timer.classList.remove("yellow")
        let scoreVal = checkWPM()
        // console.log(score)
        score.textContent = scoreVal + " WPM"
        score.classList.add("yellow")
    }
}

function startTimer(){
    id = setInterval(changeTime, 1000)
}

function onType(ev){
    if (!start){
        timer.classList.add("yellow")
        startTimer()
        start = true
    }
    if (curPos < para.length - 1 && time > 0 ) {
        let curChar = _(`l${curPos}`)
        if (ev.key === curChar.textContent){
            curChar.classList.add("white")
        }else{
            if (curChar.textContent === " "){
                curChar.classList.add("red-bg")
            }
            else{
                curChar.classList.add("red")
            }
    }
        typedWords += ev.key
        console.log(typedWords)
        curChar.classList.remove("cursor")
        curPos ++;
        nxtChar = _(`l${curPos}`)
        nxtChar.classList.add("cursor")}
}

function backSpace(ev){
    if (ev.key === "Backspace" && curPos > 0 && curPos < para.length <= 1 && time > 0){
        let curChar = _(`l${curPos}`)
        curChar.classList.remove("cursor")
        typedWords = typedWords.slice(0, typedWords.length - 1)
        console.log(typedWords)
        curPos --;
        curChar = _(`l${curPos}`)
        curChar.classList.add("cursor")
        curChar.classList.remove("red")
        curChar.classList.remove("red-bg")
        curChar.classList.remove("white")

    }
}

document.addEventListener("keydown", backSpace)
document.addEventListener("keypress", onType)