(function(){
  function $(s){return document.querySelector(s)}
  if(!window._reader) return

  const basePath = window._reader.basePath || './images/'
  const total = window._reader.totalPages || 1
  const prefix = window._reader.filePrefix || ''
  const ext = window._reader.fileExtension || '.jpg'
  let page = parseInt(localStorage.getItem(location.pathname+'_page')) || 1
  if(page < 1) page = 1
  if(page > total) page = total

  const imgEl = $('#reader-img')
  const pageNumEl = $('#page-num')
  const prevBtn = $('#btn-prev')
  const nextBtn = $('#btn-next')

  function update(){
    imgEl.src = basePath + prefix + page + ext
    pageNumEl.textContent = page + ' / ' + total
    prevBtn.disabled = page <= 1
    nextBtn.disabled = page >= total
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

  imgEl.addEventListener('click', ()=> {
    if(page < total) go(page+1)
  })

  imgEl.addEventListener('load', ()=>{
    const n = page + 1
    if(n <= total){ const p = new Image(); p.src = basePath + prefix + n + ext }
  })

  update()
})();
