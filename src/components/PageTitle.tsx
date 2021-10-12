import { Helmet } from "react-helmet-async";

interface IpageTitle {
    title: string,
}
const PageTitle: React.FunctionComponent<IpageTitle> = ({title}) => {
    return (<Helmet><title>{title} | BucksStar</title></Helmet>);
}
export default PageTitle;