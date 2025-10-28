(function(){
if(!window._reader) return


const basePath = window._reader.basePath || './images/'
const total = window._reader.totalPages || 1
const prefix = window._reader.filePrefix || ''
const ext = window._reader.fileExtension || '.png'


let page = parseInt(localStorage.getItem(location.pathname+'_page')) || 1
if(page < 1) page = 1
if(page > total) page = total


const imgEl = document.getElementById('reader-img')
const pageIndicator = document.getElementById('page-indicator')
const slider = document.getElementById('page-slider')
const toggleBtn = document.getElementById('toggle-mode')
let verticalMode = false
let halfShown = false


function update(){
imgEl.src = basePath + prefix + page + ext
localStorage.setItem(location.pathname+'_page', page)
if(pageIndicator) pageIndicator.textContent = page + ' / ' + total
if(slider) slider.value = page
if(verticalMode){
halfShown = false
imgEl.style.objectPosition = 'right top'
} else {
imgEl.style.objectPosition = 'center top'
imgEl.style.objectFit = 'contain'
}
}


function go(n){ page = Math.min(total, Math.max(1, n)); update(); }


function clickNext(){
if(verticalMode && !halfShown){
halfShown = true
imgEl.style.objectPosition = 'left top'
} else { go(page+1) }
}


function clickPrev(){
if(verticalMode && halfShown){
halfShown = false
imgEl.style.objectPosition = 'right top'
} else { go(page-1) }
}


document.addEventListener('keydown', e=>{ if(e.key==='ArrowLeft') clickPrev(); if(e.key==='ArrowRight') clickNext(); })
imgEl.addEventListener('click', e=>{ const rect=imgEl.getBoundingClientRect(); const x=e.clientX-rect.left; x<rect.width/2?clickPrev():clickNext(); })


if(slider){ slider.min=1; slider.max=total; slider.value=page; slider.addEventListener('input', ()=>go(parseInt(slider.value))); }
if(toggleBtn){
toggleBtn.addEventListener('click', ()=>{
verticalMode=!verticalMode
if(verticalMode){
document.body.classList.add('vertical-mode')
toggleBtn.textContent='Mod Orizontal'
halfShown=false
imgEl.style.objectFit='none'
imgEl.style.objectPosition='right top'
} else {
document.body.classList.remove('vertical-mode')
toggleBtn.textContent='Mod Vertical'
imgEl.style.objectFit='contain'
imgEl.style.objectPosition='center top'
}
})
}


imgEl.addEventListener('load', ()=>{ const n=page+1; if(n<=total){ const p=new Image(); p.src=basePath+prefix+n+ext; } })
update()
})();