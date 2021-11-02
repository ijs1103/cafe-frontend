import styled from "styled-components";
import SubTitle from "../components/SubTitle";
import PageTitle from "../components/PageTitle";
import React from "react";

const Container = styled.div<{bgColor?: string}>`
    width: 100%;
    background-color: ${props=>props.bgColor ? props.bgColor : "#524a3f"};
`;
const Inner = styled.div`
    padding: 50px 0;
    display: grid;
    grid-gap: 50px;
    width: 1100px;
    margin: 0 auto;
`;
const ContentLayOut: React.FC<{children: React.ReactNode, title: string, bgColor?: string}> = ({children, title, bgColor}) => {
    return(
        <Container bgColor={bgColor}>
            <PageTitle title={title} />
            <SubTitle title={title} />
            <Inner>
                {children}
            </Inner>
        </Container>
    );
};
export default ContentLayOut;