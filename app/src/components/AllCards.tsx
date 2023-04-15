import { Card } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

export const AllCards: FC<{}> = () => {
  // get all cards from /api/card/all
  // only allow to manger to access this page

  const [cards, setCards] = useState([])
  useEffect(() => {
    const fetchCards = async () => {
      const res = await axios('/api/card/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.status === 200) {
        const data = res.data;
        setCards(data);
      } else {
        alert('カードの取得に失敗しました');
      }
    };
    fetchCards();
  }, []);

  const deleteCard = async (idm: string) => {
    const res = await fetch('/api/card/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idm }),
    });
    if (res.status === 200) {
      const data = await res.json();
      setCards(data);
    } else {
      alert('カードの削除に失敗しました');
    }
  };

  return (
    <div>
      <h1>All Cards</h1>
      <Table>
        <thead>
          <tr>
            <th>利用者</th>
            <th>カードID</th>
            <th>カード名</th>
            <th>有効期限</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card: Card) => (
            <tr key={card.idm}>
              <td>{card.userName.split(' ')[0] + ' ' + card.userName.split(' ')[1]}</td>
              <td>{card.idm}</td>
              <td>{card.name}</td>
              <td>{card.expiredAt ? card.expiredAt?.toDateString() : "無期限"}</td>
              <td><a href="" onClick={() => deleteCard(card.idm)}>削除</a></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
