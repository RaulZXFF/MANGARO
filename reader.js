// reader.js — folosit în paginile capitolului
// Fiecare fișier capitol trebuie să includă aceste variabile:
// window._reader = {
// basePath: './images/', // calea relativă la imagini
// totalPages: 10, // nr. total de imagini (1..N)
// seriesName: 'One Piece',
// chapterName: 'Capitolul 1'
// }


(function(){
function $(s){return document.querySelector(s)}
function $all(s){return Array.from(document.querySelectorAll(s))}


if(!window._reader) return
const basePath = window._reader.basePath || './images/'
const total = window._reader.totalPages || 1
let page = parseInt(localStorage.getItem(location.pathname+'_page')) || 1
if(page < 1) page = 1
if(page > total) page = total


const imgEl = $('#reader-img')
const pageNumEl = $('#page-num')
const prevBtn = $('#btn-prev')
const nextBtn = $('#btn-next')


function update(){
imgEl.src = basePath + page + '.jpg'
pageNumEl.textContent = page + ' / ' + total
prevBtn.disabled = page <= 1
nextBtn.disabled = page >= total
// salvăm poziția curentă pentru capitol
localStorage.setItem(location.pathname+'_page', page)
}


function go(n){
page = Math.min(total, Math.max(1, n))
update()
}


prevBtn.addEventListener('click', ()=> go(page-1))
nextBtn.addEventListener('click', ()=> go(page+1))
document.addEventListener('keydown', (e)=>{
if(e.key === 'ArrowLeft') prevBtn.click()
if(e.key === 'ArrowRight') nextBtn.click()
})


// click pe imagine -> next
imgEl.addEventListener('click', ()=> {
if(page < total) go(page+1)
})


// preload next image
imgEl.addEventListener('load', ()=>{
const n = page + 1
if(n <= total){ const p = new Image(); p.src = basePath + n + '.jpg' }
})


update()


})()