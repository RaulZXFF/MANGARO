(function(){
if(!window._reader) return

// --- CONFIG READER ---
const basePath = window._reader.basePath || './images/'
const total = window._reader.totalPages || 1
const prefix = window._reader.filePrefix || ''
const ext = window._reader.fileExtension || '.png'

let page = parseInt(localStorage.getItem(location.pathname+'_page')) || total
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
  localStorage.setItem(location.pathname + '_page', page)
  if(pageIndicator) pageIndicator.textContent = page + ' / ' + total
  if(slider) slider.value = total - page + 1
}

function go(n){ page = Math.min(total, Math.max(1, n)); update(); }
function clickNext(){ go(page + 1) }
function clickPrev(){ go(page - 1) }

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowLeft') clickNext();
  if(e.key === 'ArrowRight') clickPrev();
})

imgEl.addEventListener('click', e => {
  const rect = imgEl.getBoundingClientRect();
  const x = e.clientX - rect.left;
  x < rect.width / 2 ? clickNext() : clickPrev();
})

if(slider){
  slider.min = 1
  slider.max = total
  slider.step = 1
  slider.value = total - page + 1
  slider.addEventListener('input', () => {
    const visualValue = parseInt(slider.value)
    go(total - visualValue + 1)
  })
}

if(toggleBtn){
  toggleBtn.addEventListener('click', () => {
    verticalMode = !verticalMode
    if(verticalMode){
      document.body.classList.add('vertical-mode')
      toggleBtn.textContent = 'Mod Orizontal'
      imgEl.style.objectFit = 'none'
    } else {
      document.body.classList.remove('vertical-mode')
      toggleBtn.textContent = 'Mod Vertical'
      imgEl.style.objectFit = 'contain'
    }
  })
}

imgEl.addEventListener('load', () => {
  const n = page - 1
  if(n >= 1){
    const p = new Image()
    p.src = basePath + prefix + n + ext
  }
})

update()
})();