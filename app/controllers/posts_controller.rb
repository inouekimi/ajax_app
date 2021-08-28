class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    # create = DBに保存
    post = Post.create(content: params[:content])
    render json:{ post: post }
    # render = 渡す
    # json = json型で
    # post: = キー。memo.jsの「XHR.response.post;」のpost;
    # post = コントローラーのcreateアクションで定義されているpost
    # XHR.response.post;」のpost;にコントローラーのcreateアクションで定義されているpostを持ってくる
    # render json:{ post: post } = JSにデータを渡す
  end
end
