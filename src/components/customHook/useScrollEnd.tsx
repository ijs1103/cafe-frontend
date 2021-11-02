import { useState, useEffect } from "react";
const useScrollEnd = () => {
    const [scrollEnd, setScrollEnd] = useState(false);
    const handleScroll = () =>
        (document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight) ? setScrollEnd(true)
            : setScrollEnd(false);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return scrollEnd;
};
export default useScrollEnd;