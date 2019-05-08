# DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|
|email|string|index: true, null: false, unique: true|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string| |
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
