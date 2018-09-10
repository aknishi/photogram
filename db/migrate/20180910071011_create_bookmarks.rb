class CreateBookmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookmarks do |t|
      t.integer :user_id, null: false
      t.integer :post_id, null: false

      t.timestamps
    end
    add_index :bookmarks, :user_id
    add_index :bookmarks, %i(post_id user_id), unique: true
  end
end
