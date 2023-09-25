import {
  Body,
  Button,
  Container,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section
} from '@react-email/components';
import * as React from 'react';

interface Props {
  validationLink: string;
}

export const AuthEmail = ({ validationLink }: Props) => (
  <Html>
    <Preview>Your login link for saturn</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Your login link for saturn</Heading>
        <Section style={buttonContainer}>
          <Button pY={11} pX={23} style={button} href={validationLink}>
            Login to saturn
          </Button>
        </Section>
        <Hr style={hr} />
        <Link href="http://localhost:3000" style={reportLink}>
          saturn
        </Link>
      </Container>
    </Body>
  </Html>
);

export default AuthEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Poppins'
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '560px'
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0'
};

const buttonContainer = {
  padding: '27px 0 27px'
};

const button = {
  backgroundColor: '#000',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block'
};

const reportLink = {
  fontSize: '14px',
  color: '#b4becc'
};

const hr = {
  borderColor: '#dfe1e4',
  margin: '42px 0 26px'
};
