const filterHeaders = document.querySelectorAll('.filters-list-li .filters .filters-header');
const toggleFilter = (element) => {
  const parentElement = element.parentElement
  if (parentElement.classList.contains('active')) {
    parentElement.classList.remove('active')
  } else {
    parentElement.classList.add('active')
  }
}

for (let i = 0; i < filterHeaders.length; i++) {
  filterHeaders[i].addEventListener('click', () => { toggleFilter(filterHeaders[i]) })
}