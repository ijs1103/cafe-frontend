import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border:1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    position: relative;
`;
interface Iglasscard{
    children: React.ReactNode
}
const GlassCard: React.FC<Iglasscard> = ({children}) => (<Container>{children}</Container>);
export default GlassCard;

