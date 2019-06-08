$(document).on("ready turbolinks:load", function() {
  var userSearchResult = $('#user-search-result');
  var groupUsers = $('.chat-group-users');

  function appendUserToSearchResult(user) {
    var html = `<div class="chat-group-user clearfix" id="chat-group-user-8">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`;
    userSearchResult.append(html);
  }

  function appendNoUserToSearchResult(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`;
    userSearchResult.append(html);
  }

  function appendUserToGroup(userId, userName) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ userId }'>
                  <p class='chat-group-user__name'>${ userName }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id-append="${ userId }">削除</div>
                </div>`;
    groupUsers.append(html);
  }

  $(document).on('click', ".user-search-add", function(){
    var userId = $(this).data('user-id');
    var userName =  $(this).data('user-name');
    appendUserToGroup(userId, userName);
    $(this).parent().remove();
  });

  $(document).on('click', ".user-search-remove", function(){
    var userId = $(this).data('user-id-append');
    $(this).parent().remove();
  });

  $('#user-search-field').on('keyup', function(e){
    var input = $('#user-search-field').val();
    if (input.length !== 0) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        userSearchResult.empty();
        if(users.length !== 0) {
          users.forEach(function(user){
            if (user.id !== $('.user-search-remove').data('user-id-append')){
              appendUserToSearchResult(user);
            } else {
              appendNoUserToSearchResult('一致するユーザーが見つかりません');
            }
          });
        } else {
          appendNoUserToSearchResult('一致するユーザーが見つかりません');
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    } else {
      userSearchResult.empty();
    }
  });
});
