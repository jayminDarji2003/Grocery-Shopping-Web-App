import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const salt = 10;
        const hashedPass = await bcrypt.hash(password, salt);
    } catch (error) {
        console.log("Error in authHelper.js")
    }
}
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}