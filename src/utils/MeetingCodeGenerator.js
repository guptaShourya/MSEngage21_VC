// Random string generator to generate unique meeting codes
const generateCode = () => {
    return Math.random().toString(36).slice(2);
}
export default generateCode;