import { Card } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export const RegisteredCards: FC<{}> = () => {
  // get users cards list from /api/card/list

  const [cards, setCards] = useState([])
  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch('/api/card/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.status === 200) {
        const data = await res.json();
        setCards(data);
      } else{
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
      <h1>Registered Cards</h1>
      <Table>
        <thead>
          <tr>
            <th>カードID</th>
            <th>カード名</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card: Card) => (
            <tr key={card.idm}>
              <td>{card.idm}</td>
              <td>{card.name}</td>
              <td><a href="" onClick={()=>deleteCard(card.idm)}>削除</a></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
