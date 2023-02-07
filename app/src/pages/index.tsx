import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Container } from 'react-bootstrap'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Container className="pt-3">
        <h1>Card Manager</h1>
        <p>部室の電子鍵に使用するICカードを管理します</p>
        <b>登録にはKokenアカウントが必要です</b>
      </Container>
    </>
  )
}
