export function Anchortag(HREF = '', Class = '', anchorTagLabel = '') {
  var anchortag = '<a href='+ "/".trim() + HREF.trim() + '    class="'+Class+'">'+anchorTagLabel+'</a></div>';
  return anchortag;
}

// "{% url 'myapp:productdetail' %}"