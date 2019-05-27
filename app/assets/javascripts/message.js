$(function(){
  function buildHTML(message) {
    var messageName = `<li class="chat-messages__name">${ message.user_name }</li>`;
    var messageTime = `<li class="chat-messages__time">${ message.created_at }</li>`;
    var messageContent = `<li class="chat-messages__text">${ message.content }</li>`;
    var messageImage = `<li class="chat-messages__image">
                          <img src="${ message.image }" > 
                        </li>` 
    var html = `<ul class="chat-messeages">
                ${ messageName } 
                ${ messageTime }
                ${ messageContent }`
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
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-screen').append(html);
      $('.chat-screen').animate({scrollTop: $('.chat-screen')[0].scrollHeight});
      $('.new-message__text').val("");
      $('.new-message__image').val("");
      $('.send-message__submit-btn').attr('disabled', false);
    })
    .fail(function(){
      alert('メッセージを画像を入力してください')
      $('.send-message__submit-btn').attr('disabled', false);
    })
  });
});