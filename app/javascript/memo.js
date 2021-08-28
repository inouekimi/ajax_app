const buildHTML = (XHR) => {  
  const item = XHR.response.post;
  // response = レスポンスプロパティ。サーバーからのレスポンスに関する情報が格納されたプロパティ
  // レスポンスプロパティの中身 = DB: {posts: {id, content, created_at, updates_at }}
  // レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  // getElementByIdメソッドで取得した投稿ボタンの要素を変数submitに格納
  submit.addEventListener("click", (e) => {
  // 要素がクリックされた時にイベント発火
  // (e) = イベントオブジェクトといい、イベント発生時の情報を持ったオブジェクト
  // 今回だと、「投稿ボタンをクリックした」という情報を持ったオブジェクト
    e.preventDefault();
    // preventDefault()メソッドとは、既定のイベントを無効化するためのメソッド
    // 既定のイベントを無効化するメソッドとは、今回だと、「投稿ボタンをクリックする」になる
    // プラウザで投稿ボタンをクリックさた時に同じ内容が２つ投稿されてしまう
    // Ajax_Appで実装したリクエストと、デフォルトで送信されてしまうブラウザからのリクエストがあるため
    // デフォルトで送信されてしまうブラウザからのリクエストをキャンセルするためのメソッドがpreventDefault()メソッド
    const form = document.getElementById("form");
    // getElementByIdメソッドを用いて、フォームの要素を取得し、変数formに格納
    const formData = new FormData(form);
    // 書き方 = new FormData(フォームの要素);
    // new FormData(form); = フォームに入力された値を取得し変数formDataに格納
    const XHR = new XMLHttpRequest();
    // new XMLHttpRequest(); = 
    XHR.open("POST", "/posts", true);
    // XHR.open = リクエストの内容を指定するためのメソッド
    // 書き方  XHR.open ("HTTPメソッド", "パス", "非同期通信のON(true)/OFF(false)")
    // HTTPメソッドは非同期で投稿したメモをデーターベースに保存したいので"POST"を使用
    XHR.responseType = "json";
    XHR.send(formData);
    // sendメソッド = リクエストを送信するメソッド
    // 上記で変数formDataに格納されたフォームに入力された値をサーバー側に送信する
    XHR.onload = () => {
      // onload = オンロードプロパティ。DBに保存するようリクエストの送信が成功した時呼び出されるプロパティ
      // () => アロー関数を用いてオンロードプロパティでDBへのリクエストが成功した時に行う処理を定義する
      if (XHR.status != 200) {
        // XHR.status = HTTPステータスコード(200,リクエストが成功した)
        // XHR.status != 200 = ステータスコードが200ではない場合(リクエストに失敗した場合)
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // alertが表示される
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // <挿入したい要素名>.insertAdjacentHTML(挿入したい位置,挿入したいHTML);
      // buildHTML(XHR) = 上記の関数を呼び出している
      formText.value = "";
      // formTextのvalue属性に空の文字列を指定することで、フォームの中身をリセット
    };
  });
};
 
 window.addEventListener('load', post);
//  ページが読み込まれた後にイベント発火
// post = 関数postの呼び出し