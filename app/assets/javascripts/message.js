$(function(){
  function buildHTML(message) {
    var messageName = `<li class="chat-messages__name">${ message.user_name }</li>`;
    var messageTime = `<li class="chat-messages__time">${ message.created_at }</li>`;
    var messageContent = `<li class="chat-messages__text">${ message.content }</li>`;
    var messageImage = `<div class="chat-messages__image">
                          <img src="${ message.image }" > 
                        </div>` 
    var html = `<ul class="chat-messeages">
                ${ messageName } 
                ${ messageTime }`
    html += (message.content) ? `${ messageContent }` : "";
    html += (message.image) ? `${ messageImage }  </ul>` : `</ul>`;
    return html
  }
  $('#new-message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  });
});