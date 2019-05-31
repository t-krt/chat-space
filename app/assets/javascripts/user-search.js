$(document).on("ready turbolinks:load", function() {
  var search_user_list = $('#user-search-result')
  var group_members = $('.chat-group-users')

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix" id="chat-group-user-8">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    search_user_list.append(html);
  }

  function appendNoUserToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_user_list.append(html)
  }

  function appendUserToGroup(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${ user_id }">削除</div>
                </div>`
    group_members.append(html)
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
          appendUser(user);
        });
      }
      else {
        appendNoUserToHTML('一致するユーザーが見つかりません')
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  });
});
