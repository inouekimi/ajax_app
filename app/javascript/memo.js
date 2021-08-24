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
  });
};
 
 window.addEventListener('load', post);
//  ページが読み込まれた後にイベント発火
// post = 関数postの呼び出し