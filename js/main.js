let generatbutton = document.querySelector(".generate");
let autobutton = document.querySelector(".auto");
let stopbutton = document.querySelector(".stop");
let quotediv = document.querySelector(".quote-display");
let quoteid = document.querySelector(".quote-id");
let autostatus = document.querySelector(".auto-status");
let author = document.querySelector(".author");
let timer = document.querySelector(".time");
let intervalid;

async function getQuotes() {
  const apiUrl = "https://api.api-ninjas.com/v1/quotes";
  const apiKey = "nWzBI7U6WpGeOS7CcIvSGg==LbTdPy3Dx3rgykci"; // استبدل هذا بمفتاح API الخاص بك
  let res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey, // إضافة المفتاح في الرأس
      "Content-Type": "application/json", // تحديد نوع المحتوى
    },
  });
  let resjson = await res.json();

  return resjson;
}

async function generatQuote() {
  const quote = await getQuotes();

  quotediv.innerHTML = quote[0].quote;
  quoteid.innerHTML = Math.floor(Math.random() * 100);
  author.innerHTML = quote[0].author;
}
generatbutton.onclick = generatQuote;
autobutton.onclick = () => {
  autostatus.classList.add("auto-on");
  autostatus.innerHTML = "Auto is ON";
  intervalid = setInterval(async () => {
    timer.classList.remove("timer");
    generatQuote();
    await timer.classList.add("timer");
  }, 7000);
};
stopbutton.onclick = () => {
  autostatus.classList.remove("auto-on");
  timer.classList.remove("timer");
  autostatus.innerHTML = "";
  clearInterval(intervalid);
};
