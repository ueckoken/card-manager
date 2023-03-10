import { Button, Container } from 'react-bootstrap'

export default function HowTo() {
  return (
      <Container className="pt-3">
        <h1>Idm番号の取得方法</h1>
        <p>
          IdmはFelicaに搭載されているICカードの識別番号です。
          KagiModではIdmを使用してカードを管理しています。
          <br/>
          専用のカードリーダがなくても、スマホでIdmを取得することができます。
          <br/>
          <ul>
            <li>交通系のカードなどに対応した残高読み取りアプリをダウンロードしてください。</li>
            <li>iPhoneの場合は <a href="https://apps.apple.com/jp/app/id1478703111">マルチICカードリーダー</a></li>
            <li>Androidの場合は <a href="https://play.google.com/store/apps/details?id=yanzm.products.suicareader&hl=ja&gl=US">Suica Reader</a></li>
          </ul>
          アプリの使い方は各アプリの説明を参照してください。
          <br/>
          おそらくアプリを使ってカードを読み取る16桁の文字列がどこかに表示されると思うので、それをIdmとして登録します。<br />
          なお、:や空白などの余計な文字は省いた16桁の文字列として入力してください。
        </p>
      </Container>
  )
}
