// Code Written in 2021 By abdullah Osama (abdalaosamah@gmail.com/owner@3bdallah.net)
// -------------------------------------------------------------------------------------------------

const DefaultReplacmentLetter = "س"; // this is the letter to replace the first letter with
var Mode = 1; // 1 means arabic to sanguagelemon, 2 is the reverse

function Lamoon1(scentence) {
  // Converts The { scentence } to Sanguage Lemon
  // The Code ahead is Pretty Messed Up, I Didn't Think About it too much :), If you are senstive Please Leave This is not for the faint of hearts    
  let words = scentence.split(" ");
  let result = [];

  for (let i = 0; i < words.length; i++) {
    if (!isValid(words[i])) {
      words[i] = words[i].replace(/[^ء-ي]?(\n)?/g,"")
    } 
    try {
      if (words[i].substr(0, 2) == "ال") {
        // it starts with al
        words[i] = words[i].substr(2);
        let word = randomWord(words[i].charAt(0));
        changed = words[i].split("");
        if(changed[0] == "س"){
          //it starts with als
          word = randomWord("")
          changed[0] = word.charAt(0)
          result.push("ال" + changed.join(""));
          temp = word.split('')
          temp[0] = "س"
          result.push(temp.join(""));
          continue
        }
        changed[0] = DefaultReplacmentLetter;
        result.push("ال" + changed.join(""));
        result.push(word);
        continue
      } else {
        //it doesn't have al
        let word = randomWord(words[i].charAt(0));
        changed = words[i].split("");
        if(changed[0] == "س"){
          //it starts with s
          word = randomWord("")
          changed[0] = word.charAt(0)
          result.push(changed.join(""));
          temp = word.split('')
          temp[0] = "س"
          result.push(temp.join(""));
          continue
        }
        changed[0] = DefaultReplacmentLetter;
        result.push(changed.join(""));
        result.push(word);
        continue
      }
    } catch (error) {
      alert(" حصل خطأ, رجاء مراجعه المدخلات");
    }
  
  }
  return result.join(" ");
}

function Lamoonifiy(scentence){
  delimeter = /([!@#$%^&*(),.?":{}|<>\s])/g
  scentence = scentence.replace(/([A-z]|\n|\s{2})/g,"").replace(/([A-z]|\n|\s{2})/g,"")// remove all the extra spaces or the english letters 
  words = scentence.split(delimeter) // Split the string into managebale parts
  result = []
  for(let i = 0;i <words.length;i++){
    if(/\s/g.test(words[i]) || words[i] == ""){//Removing The spaces and Empty Strings
      words.splice(i,1)
      i--
    }
  }
  for(let i = 0;i <words.length;i++){
    result.push(Lamoon(words[i]))
  }
  return result.join(' ')
}
function Lamoon(word){ // lamoons one word only

  alFlag = false
  if(word == "و" ||/([!@#$%^&*(),.?":{}|<>\s])/g.test(word) ){ // if it is waw or any from the delemeters then it will return it untouched
    return word
  }
  if(word.substr(0, 2) == "ال"){
   word = word.substr(2)
   alFlag = true
  }
  
  if(word.charAt(0) == "س"){ // Supporting the s case
    
    RandomWord = randomWord("")
    RandomLetter = RandomWord[0]
    
    NewRandomWord = RandomWord.split("")
    NewRandomWord[0] = "س"
    NewRandomWord = NewRandomWord.join("")

    word = word.split("")
    word[0] = RandomLetter
    word = word.join("")

    return (alFlag?"ال":"")+word +" "+NewRandomWord
  }

  RandomWord = randomWord(word[0])

  word = word.split("")
  word[0] = "س"
  word = word.join("")

  return (alFlag?"ال":"")+word +" "+RandomWord
}

function randomWord(Letter, word) {
  // Returns a random Word Starting With the {Letter}
    if(Letter == ""){
        RandomLetter =  Words[Object.getOwnPropertyNames(Words)[~~(Math.random() * Object.getOwnPropertyNames(Words).length)]]
        return RandomLetter[~~(Math.random() * RandomLetter.length)]
    }else{
        return Words[Letter][~~(Math.random() * Words[Letter].length)];
    }
}

function unLamoonify(scentence){    // This Function SHOULD Translate Sanguage Lemon Back to Arabic , I am writting This so Late I need to sleep :(
  delimeter = /([!@#$%^&*(),.?":{}|<>\s])/g
  scentence = scentence.replace(/([A-z]|\n|\s{2})/g,"").replace(/([A-z]|\n|\s{2})/g,"")// remove all the extra spaces or the english letters 
  words = scentence.split(delimeter) // Split the string into managebale parts
  result = []
  for(let i = 0;i <words.length;i++){
    if(/\s/g.test(words[i]) || words[i] == ""){//Removing The spaces and Empty Strings
      words.splice(i,1)
      i--
    }
  }
  for (let i = 0; i < words.length; i = i + 2) {

    if(/([!@#$%^&*(),.?":{}|<>\s])/g.test(words[i])){
      result.push(words[i])
      words.splice(i,1)
      i -= 2
      continue
    }
    
    if (words[i].substr(0, 2) == "ال") {
      words[i] = words[i].substr(2);
      let word = words[i].split("");
      word[0] = words[i + 1].charAt(0);
      result.push("ال" + word.join(""));
    } else {
      let word = words[i].split("");
      word[0] = words[i + 1].charAt(0);
      result.push(word.join(""));
    }
  }
  
  return result.join(' ')

}


function isValid(Word) {
  // returns True if the word is valid and Lammonable :)

  if (Word < 1) return false;
  if (Word == "و") return false;
  if (/[^ء-ي]/g.test(Word)) return false;
  return true;
}

// -------------------------------------------------------------------------------------------------
// Events
document.getElementById("convertBtn").addEventListener("click", function (e) {
  let text = document.getElementById("Input").value;
  if (/[a-z]/g.test(text)) {
    AlertError("حصل خطأ , راجع المدخلات");
    return;
  }

  if (Mode == 1) {
    document.getElementById("out").innerHTML = Lamoonifiy(text);
  } else {
    document.getElementById("out").innerHTML = unLamoonify1(text);
  }
});
function AlertError(Word) {
  alert(Word);
  document.getElementById("Input").value = "";
}
document.querySelector("select").addEventListener("change", function (e) {
  Mode = this.value;
  if (Mode == "1") {
    document.getElementById("firstField").innerHTML = "عربي";
    document.getElementById("secondField").innerHTML = "سغة لمون";
  } else {
    document.getElementById("firstField").innerHTML = "سغة لمون";
    document.getElementById("secondField").innerHTML = "عربي";
  }
});

document.getElementById('execCopy').addEventListener('click', execCopy);

function execCopy() {
  document.getElementById("out").select();
  document.execCommand("copy");
  alert("تم النسخ")
}

