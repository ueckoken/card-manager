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
            CardManager
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!session && <Nav.Link onClick={()=>signIn("keycloak")}>Login</Nav.Link>}
            {(session) &&
              <NavDropdown title={session.user!.name} align="end">
                <NavDropdown.Item href="/register">
                  カード登録
                </NavDropdown.Item>
                {session.user?.groups?.includes('/manager') &&
                  <NavDropdown.Item href="/admin">
                    管理画面
                  </NavDropdown.Item>
                }
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
