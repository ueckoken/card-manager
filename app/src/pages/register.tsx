// register page and post /api/card/register

import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { RegisteredCards } from '../components/RegisteredCards';
import { getIdm } from '@/utils/felicaHandler';
import axios from 'axios';

export default function Register() {
  const session = useSession();
  const router = useRouter();
  const [cardId, setCardId] = useState('');
  const [name, setName] = useState('');
  const [conncted, setConnected] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios('/api/card/register', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        "idm": cardId,
        "name": name
      },
    });
    if (res.status === 200) {
      alert('登録しました');
      window.location.reload()
    } else {
      alert('登録に失敗しました');
    }
  };

  async function sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

  const toggleConnect = () => {
    if (!conncted) {
      handleConnectReader();
    }
  }

  const handleConnectReader = async () => {
    //@ts-ignore
    const device = await navigator.usb.requestDevice({
      filters: [
        { vendorId: 0x054c }
      ]
    });
    await device.open();
    setConnected(true);
    await device.selectConfiguration(1);
    await device.claimInterface(0);
    setCardId(await getIdm(device));
    try {
      while (true) {
        const idm = await getIdm(device);
        if (idm != '') {
          setCardId(idm);
          device.close();
          setConnected(false);
          break;
        }
        sleep(500);
      }
    } catch (e) {
      console.log(e);
      await device.close();
    }
  }

  return (
    <Container className="pt-3">
      <h1>Card Manager</h1>
      <p>部室の電子鍵に使用するICカードを管理します</p>
      <Button variant="primary" onClick={toggleConnect}>
        {
          conncted ? 'Pasori切断' : 'Pasori接続'
        }
      </Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cardId">
          <Form.Label>カードIdm</Form.Label><br />
          <small>Pasoriを持っていない場合はスマホでIdmを取得できます( <a href="howto" target='_blank'>方法</a> )</small>
          <Form.Control
            type="text"
            placeholder="カードIdmを入力してください"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
          />
          <Form.Label>名前</Form.Label>
          <Form.Control
            type="text"
            placeholder="カードを区別するための名前を入力してください"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          登録
        </Button>
      </Form>
      <RegisteredCards />
    </Container>
  );
}