$(document).on("ready turbolinks:load", function() {
  var user_search_result = $('#user-search-result')
  var group_users = $('.chat-group-users')

  function appendUserToSearchResult(user) {
    var html = `<div class="chat-group-user clearfix" id="chat-group-user-8">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    user_search_result.append(html);
  }

  function appendNoUserToSearchResult(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    user_search_result.append(html)
  }

  function appendUserToGroup(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${ user_id }">削除</div>
                </div>`
    group_users.append(html)
  }

  $(document).on('click', ".user-search-add", function(){
    var user_id = $(this).data('user-id')
    var user_name =  $(this).data('user-name')
    appendUserToGroup(user_id, user_name)
    $(this).parent().remove();
  });

  $(document).on('click', ".user-search-remove", function(){
    var user_id = $(this).data('user-id')
    $(this).parent().remove();
  });

  $('#user-search-field').on('keyup', function(e){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          appendUserToSearchResult(user);
        });
      }
      else {
        appendNoUserToSearchResult('一致するユーザーが見つかりません')
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  });
});
