import { AllCards } from '../components/AllCards';
import { Inter } from '@next/font/google'
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap'

export default function Admin() {
  const { data: session } = useSession();
  useEffect(()=>{
    if(!session)return;
    if(!session.user?.groups?.includes('/manager')){
      window.location.href = '/'
    }
  },[])
  return (
    <Container className= "pt-3" >
      <AllCards />
    </Container>
  );
}
