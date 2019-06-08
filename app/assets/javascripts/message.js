$(document).on("turbolinks:load", function(){
  function buildHTML(message) {
    var messageName = `<li class="chat-messages__name">${ message.user_name }</li>`;
    var messageTime = `<li class="chat-messages__time">${ message.created_at }</li>`;
    var messageContent = `<li class="chat-messages__text">${ message.content }</li>`;
    var messageImage = `<li class="chat-messages__image">
                          <img src="${ message.image }" > 
                        </li>`;
    var html = `<ul class="chat-messages" data-id="${ message.id }">
                ${ messageName } 
                ${ messageTime }`;
    html += (message.content) ? `${ messageContent }` : `<li class="chat-messages__text"></li>`;
    html += (message.image) ? `${ messageImage }  </ul>` : `</ul>`;
    return html;
  }

  $('#new-message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href;
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
      alert('メッセージを入力するか、画像を選択してください');
      $('.send-message__submit-btn').attr('disabled', false);
    })
  });

  // 自動更新機能の実装
  var autoUpdate = setInterval(function() {
    var groupId = $('.contents-header').data('group-id');
    var lastMessageId = $('.chat-messages').last().data('id');
    if (document.URL.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        type: 'GET',
        url: `/groups/${groupId}/api/messages`,
        data: {id: lastMessageId},
        dataType: 'json'
      })
      .done(function(messages) {
        $.each(messages, function(i, message){
          var insertHTML = buildHTML(message);
          $('.chat-screen').append(insertHTML);
          $('.chat-screen').animate({scrollTop: $('.chat-screen')[0].scrollHeight});
        });
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(autoUpdate);
    }
  }, 5000);
});
