Rails.application.routes.draw do
  root to: 'posts#index'
  # root = toppageへのリクエストがあった時、postsコントローラーのindexアクションが動く
  post 'posts', to: 'posts#create'
end
