const cutAddressMiddleChars = (str: string) => {
    if (!str || typeof str !== "string") return "";
    if (str.length > 35) {
        return `${str.slice(0, 10)}...${str.slice(-10)}`;
    }
    return str;
};

export default cutAddressMiddleChars;