import { getToken } from "next-auth/jwt";
import { signIn, signOut, useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const Header: FC<{}> = () => {
  const { data: session } = useSession();
  return (
    <header>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            KokenLdapManager
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!session && <Nav.Link onClick={()=>signIn("keycloak")}>Login</Nav.Link>}
            {(session) &&
              <NavDropdown title={session.user!.name} align="end">
                <NavDropdown.Item>
                  ユーザー設定
                  <Button variant="outline-primary" size="sm" className="float-end" onClick={()=>console.log(session.user)}></Button>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={()=>signOut()}>
                  ログアウト
                </NavDropdown.Item>
              </NavDropdown>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
